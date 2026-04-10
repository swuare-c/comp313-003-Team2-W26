const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../../config/config");
const crypto = require("crypto");

const cookieOptions = {
  httpOnly: true,
  secure: false, // set true in production (HTTPS)
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    if (password.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({ email, passwordHash });

    res.status(201).json({
      message: "User registered",
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id },
      config.jwtSecret,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, cookieOptions);

    res.json({
      message: "Login successful",
      user: {
        userId: user._id,
        email: user.email,
        displayName: user.displayName,
        occupation: user.occupation,
        gender: user.gender,
        settings: user.settings,
        createdAt: user.createdAt
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      userId: user._id,
      email: user.email,
      displayName: user.displayName,
      occupation: user.occupation,
      gender: user.gender,
      settings: user.settings,
      createdAt: user.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Request password reset: generate token & "send" it
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    console.log(`requestPasswordReset ${email} ${user}`);
    // if (!user) {
    //   // For security, don't reveal that email doesn't exist
    //   return res.status(200).json({
    //     message:
    //       "If an account with that email exists, a reset link has been generated.",
    //   });
    // }

    if (!user) {
      return res.status(404).json({ message: "Email is not registered." });
    }

    // Generate secure token
    const token = crypto.randomBytes(20).toString("hex");

    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    // In a production app, we would email a link containing this token.
    // Example: https://yourapp.com/reset-password?token=...&email=...
    // For now we return the token so the frontend can simulate that link.
    console.log(`Password reset token for ${email}: ${token}`);

    return res.status(200).json({
      message:
        "A password reset link has been generated. Please follow the next step to choose a new password.",
      resetToken: token, // <-- frontend will read this and redirect to /reset-password?token=...
    });
  } catch (err) {
    console.error("requestPasswordReset error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

    if (!email || !token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email, reset link, and new password are required." });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    const user = await User.findOne({
      email,
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({
          message:
            "This reset link is invalid or has expired. Please request a new one.",
        });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    user.passwordHash = passwordHash;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return res.json({
      message: "Your password has been reset. You can now log in with it.",
    });
    } catch (err) {
    console.error("resetPassword error:", err);
    return res.status(500).json({ message: "Server error" });
    }
    };

    exports.updateProfile = async (req, res) => {
    try {
    const { displayName, occupation, gender, settings } = req.body;
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (displayName !== undefined) user.displayName = displayName;
    if (occupation !== undefined) user.occupation = occupation;
    if (gender !== undefined) user.gender = gender;
    
    if (settings) {
      if (settings.theme) user.settings.theme = settings.theme;
      if (settings.reflectionDepth) user.settings.reflectionDepth = settings.reflectionDepth;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        userId: user._id,
        email: user.email,
        displayName: user.displayName,
        occupation: user.occupation,
        gender: user.gender,
        settings: user.settings,
        createdAt: user.createdAt
      }
    });
    } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ message: "Server error" });
    }
    };

    exports.deleteAccount = async (req, res) => {
    try {
    const userId = req.userId;

    // 1. Delete all reflections associated with this user
    const Reflection = require("../models/reflection");
    await Reflection.deleteMany({ user: userId });

    // 2. Delete the user itself
    await User.findByIdAndDelete(userId);

    // 3. Clear the auth cookie
    res.clearCookie("token");

    res.json({ message: "Account and history permanently deleted." });
    } catch (err) {
    console.error("deleteAccount error:", err);
    res.status(500).json({ message: "Server error" });
    }
    };