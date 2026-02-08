const axios = require("axios");
const db = require("../config/db");

exports.syncTemplates = async (req, res) => {
    const { accountId } = req.params;
    const userId = req.user.id;

    try {
        // Get account details
        const accountRes = await db.query(
            "SELECT * FROM whatsapp_accounts WHERE id = $1 AND user_id = $2",
            [accountId, userId]
        );

        if (accountRes.rows.length === 0) {
            return res.status(404).json({ error: "Account not found" });
        }

        const { phone_number_id, access_token, business_portfolio_id } = accountRes.rows[0];

        // Meta API call to get templates
        // Note: WABA_ID is often needed. Assuming business_portfolio_id is the WABA ID or can be used.
        const response = await axios.get(
            `https://graph.facebook.com/v19.0/${business_portfolio_id}/message_templates`,
            {
                headers: { Authorization: `Bearer ${access_token}` },
            }
        );

        const templates = response.data.data;

        // Filter and save APPROVED templates
        for (const template of templates) {
            if (template.status === "APPROVED") {
                await db.query(
                    `INSERT INTO templates (wa_account_id, template_name, language, status, category)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (wa_account_id, template_name, language) 
           DO UPDATE SET status = EXCLUDED.status, category = EXCLUDED.category`,
                    [accountId, template.name, template.language, template.status, template.category]
                );
            }
        }

        res.json({ message: "Templates synced successfully", count: templates.length });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: "Failed to sync templates" });
    }
};

exports.getTemplates = async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await db.query(
            `SELECT t.* FROM templates t 
       JOIN whatsapp_accounts wa ON t.wa_account_id = wa.id 
       WHERE wa.user_id = $1`,
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch templates" });
    }
};
