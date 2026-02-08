const db = require("../config/db");

exports.importContacts = async (req, res) => {
    const { contacts } = req.body; // Array of { name, phone, tags }
    const userId = req.user.id;

    try {
        const values = contacts.map(c => `('${userId}', '${c.name}', '${c.phone}', ARRAY[${c.tags.map(t => `'${t}'`).join(",")}])`).join(",");

        // Simple bulk insert (assuming valid data for brevity)
        await db.query(
            `INSERT INTO contacts (user_id, name, phone, tags) VALUES ${values}
       ON CONFLICT (user_id, phone) DO UPDATE SET name = EXCLUDED.name, tags = EXCLUDED.tags`
        );

        res.status(201).json({ message: `${contacts.length} contacts imported/updated` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to import contacts" });
    }
};

exports.getContacts = async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await db.query("SELECT * FROM contacts WHERE user_id = $1", [userId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch contacts" });
    }
};
