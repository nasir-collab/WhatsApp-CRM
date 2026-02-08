const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");
const authMiddleware = require("../middleware/auth");

router.get("/sync/:accountId", authMiddleware, templateController.syncTemplates);
router.get("/", authMiddleware, templateController.getTemplates);

module.exports = router;
