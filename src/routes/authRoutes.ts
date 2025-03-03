import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/user";
import { Sequelize } from "sequelize";
import db from "../models/index"; // Assuming you have a sequelize instance exported from this file

type JwtPayload = {
  userId: string;
  role: string;
};

const User = UserModel(db.sequelize as Sequelize);

const router = express.Router();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    // Ensure JWT_SECRET is defined
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ message: "JWT secret is not defined" });
      return;
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.id.toString(), role: user.role } as JwtPayload, jwtSecret, {
      expiresIn: "1h",
    });

    res.json({ token, data: { message: "Login Successfully", user } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
});

export default router;
