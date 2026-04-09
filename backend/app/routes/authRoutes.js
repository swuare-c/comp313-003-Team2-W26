const express = require("express");
const router = express.Router();

const { register, login, logout, me, requestPasswordReset, resetPassword, updateProfile, deleteAccount } = require("../controllers/authController");
const requireAuth = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);
router.put("/update-profile", requireAuth, updateProfile);
router.delete("/delete-account", requireAuth, deleteAccount);

router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

module.exports = router;
