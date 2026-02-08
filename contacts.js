const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const authMiddleware = require("../middleware/auth");

router.post("/import", authMiddleware, contactController.importContacts);
router.get("/", authMiddleware, contactController.getContacts);

module.exports = router;
