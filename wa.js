const express = require("express");
const router = express.Router();
const waController = require("../controllers/waController");
const authMiddleware = require("../middleware/auth");

router.post("/connect", authMiddleware, waController.connectAccount);
router.get("/accounts", authMiddleware, waController.getAccounts);

module.exports = router;
