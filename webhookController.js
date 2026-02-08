const db = require("../config/db");

exports.verifyWebhook = (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token === process.env.META_VERIFY_TOKEN) {
        return res.status(200).send(challenge);
    }
    res.sendStatus(403);
};

exports.handleWebhook = async (req, res) => {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0]?.value;

    if (changes?.statuses) {
        for (const status of changes.statuses) {
            console.log("Message status update:", status);
            await db.query(
                "UPDATE messages SET status = $1 WHERE wa_message_id = $2",
                [status.status, status.id]
            );
        }
    }

    if (changes?.messages) {
        for (const msg of changes.messages) {
            console.log("Incoming reply:", msg);
            // Store reply in conversations table
            // Assuming 'from' is the contact phone number
            await db.query(
                "INSERT INTO conversations (contact_phone, message_text, direction, wa_message_id) VALUES ($1, $2, $3, $4)",
                [msg.from, msg.text?.body || "", "inbound", msg.id]
            );
        }
    }

    res.sendStatus(200);
};
