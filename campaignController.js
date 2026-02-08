const db = require("../config/db");
const { campaignQueue } = require("../services/queue");

exports.createCampaign = async (req, res) => {
    const { template_id, wa_account_id, scheduled_at, contact_ids } = req.body;
    const userId = req.user.id;

    try {
        const result = await db.query(
            "INSERT INTO campaigns (user_id, template_id, wa_account_id, status, scheduled_at) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [userId, template_id, wa_account_id, "draft", scheduled_at]
        );
        const campaignId = result.rows[0].id;

        // Associate contacts with campaign (this could be a mapping table, but for now we'll assume we fetch them and create messages)
        const contacts = await db.query("SELECT id FROM contacts WHERE id = ANY($1)", [contact_ids]);

        for (const contact of contacts.rows) {
            await db.query(
                "INSERT INTO messages (campaign_id, contact_id, status) VALUES ($1, $2, $3)",
                [campaignId, contact.id, "pending"]
            );
        }

        res.status(201).json({ id: campaignId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create campaign" });
    }
};

exports.startCampaign = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const campaign = await db.query(
            "SELECT * FROM campaigns WHERE id = $1 AND user_id = $2",
            [id, userId]
        );

        if (campaign.rows.length === 0) {
            return res.status(404).json({ error: "Campaign not found" });
        }

        // Add to queue
        await campaignQueue.add("process-campaign", { campaignId: id });

        await db.query("UPDATE campaigns SET status = 'running' WHERE id = $1", [id]);

        res.json({ message: "Campaign started and added to queue" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to start campaign" });
    }
};

exports.getCampaignStats = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            "SELECT status, COUNT(*) as count FROM messages WHERE campaign_id = $1 GROUP BY status",
            [id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch stats" });
    }
};

exports.getCampaigns = async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await db.query("SELECT * FROM campaigns WHERE user_id = $1", [userId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch campaigns" });
    }
};
