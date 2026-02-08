const db = require("../config/db");

exports.connectAccount = async (req, res) => {
    const { phone_number_id, business_portfolio_id, access_token } = req.body;
    const userId = req.user.id;

    try {
        const result = await db.query(
            "INSERT INTO whatsapp_accounts (user_id, phone_number_id, business_portfolio_id, access_token) VALUES ($1, $2, $3, $4) RETURNING *",
            [userId, phone_number_id, business_portfolio_id, access_token]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to connect WhatsApp account" });
    }
};

exports.getAccounts = async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await db.query("SELECT id, phone_number_id, business_portfolio_id FROM whatsapp_accounts WHERE user_id = $1", [userId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch accounts" });
    }
};
