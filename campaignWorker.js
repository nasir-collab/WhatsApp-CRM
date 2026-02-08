const { Worker } = require("bullmq");
const axios = require("axios");
const db = require("../config/db");
const { connection } = require("../services/queue");

const worker = new Worker(
    "campaigns",
    async (job) => {
        const { campaignId } = job.data;
        console.log(`Processing campaign ${campaignId}`);

        const campaign = await db.query(
            `SELECT c.*, t.template_name, t.language, wa.phone_number_id, wa.access_token 
       FROM campaigns c 
       JOIN templates t ON c.template_id = t.id 
       JOIN whatsapp_accounts wa ON c.wa_account_id = wa.id 
       WHERE c.id = $1`,
            [campaignId]
        );

        if (campaign.rows.length === 0) return;

        const { phone_number_id, access_token, template_name, language } = campaign.rows[0];

        const messages = await db.query(
            "SELECT m.*, c.phone FROM messages m JOIN contacts c ON m.contact_id = c.id WHERE m.campaign_id = $1 AND m.status = 'pending'",
            [campaignId]
        );

        for (const msg of messages.rows) {
            try {
                const response = await axios.post(
                    `https://graph.facebook.com/v19.0/${phone_number_id}/messages`,
                    {
                        messaging_product: "whatsapp",
                        to: msg.phone,
                        type: "template",
                        template: {
                            name: template_name,
                            language: { code: language },
                        },
                    },
                    {
                        headers: { Authorization: `Bearer ${access_token}` },
                    }
                );

                await db.query(
                    "UPDATE messages SET status = 'sent', wa_message_id = $1 WHERE id = $2",
                    [response.data.messages[0].id, msg.id]
                );
            } catch (err) {
                console.error(`Failed to send to ${msg.phone}:`, err.response?.data || err.message);
                await db.query("UPDATE messages SET status = 'failed' WHERE id = $1", [msg.id]);
            }

            // Simple rate limiting delay
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        await db.query("UPDATE campaigns SET status = 'completed' WHERE id = $1", [campaignId]);
    },
    { connection }
);

worker.on("completed", (job) => {
    console.log(`${job.id} has completed!`);
});

worker.on("failed", (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
});
