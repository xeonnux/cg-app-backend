const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

router.post("/login", async (req, res) => {
  const data = req.body;
  const { email, password } = data;
  // Find user in the database
  const user = await User.findOne({
    where: { email },
  });

  if (!user) return res.status(400).json({ message: "User not found" });

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // // Create JWT token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, data: { message: "login Successfully", user } });
});

module.exports = router;
