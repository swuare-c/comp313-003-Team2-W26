const express = require("express");
const router = express.Router();

const requireAuth = require("../middlewares/authMiddleware");
const reflectController = require("../controllers/reflectController");

router.post("/", requireAuth, reflectController.reflect);
router.get("/history", requireAuth, reflectController.getHistory);
router.delete("/history", requireAuth, reflectController.clearHistory);

module.exports = router;
