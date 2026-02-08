const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");
const authMiddleware = require("../middleware/auth");

router.post("/create", authMiddleware, campaignController.createCampaign);
router.post("/:id/start", authMiddleware, campaignController.startCampaign);
router.get("/:id/stats", authMiddleware, campaignController.getCampaignStats);
router.get("/", authMiddleware, campaignController.getCampaigns);

module.exports = router;
