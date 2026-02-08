require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const waRoutes = require("./routes/wa");
const templateRoutes = require("./routes/templates");
const contactRoutes = require("./routes/contacts");
const campaignRoutes = require("./routes/campaigns");
const webhookRoutes = require("./routes/webhooks");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wa", waRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/webhook", webhookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
