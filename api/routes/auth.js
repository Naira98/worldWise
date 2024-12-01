import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "bson";
import { tokens, users } from "../models/collections.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verify,
} from "../lib/helpers.js";
import { REFRESH_SECRET } from "../config.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      throw new Error("Email, Password and Name are required");

    const alreadyExists = await users.findOne({ email: email });
    if (alreadyExists) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await users.insertOne({
      email,
      password: hashedPassword,
      name,
    });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(422).json(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Email and Password are required");

    const userData = await users.findOne({ email: email });
    if (!userData) throw new Error("Wrong email or password");

    const match = await bcrypt.compare(password, userData.password);
    if (!match) throw new Error("Wrong email or password");

    const user = {
      userId: userData._id,
      email: userData.email,
      name: userData.name,
    };
    await tokens.findOneAndDelete({ userId: userData._id });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await tokens.insertOne({
      userId: userData._id,
      accessToken,
      refreshToken,
    });

    return res.status(200).json({
      userId: userData._id,
      name: userData.name,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return res.status(422).json(err.message);
  }
});

router.post("/logout", async (req, res) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) throw new Error("You are not authenticated");

    const token = authHeaders.split(" ")[1];
    const tokenInDb = await tokens.findOne({ accessToken: token });
    if (!tokenInDb) throw new Error("Token is not valid");

    await tokens.deleteOne({ accessToken: token });
    res.status(200).json("You logged out successfully");
  } catch (err) {
    return res.status(401).json(err.message);
  }
});

router.get("/getUser", verify, (req, res) => {
  try {
    if (req.user) return res.status(200).json(req.user);
  } catch (err) {
    return res.status(401).json(err.message);
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) throw new Error("No refresh token available");

    const tokenInDb = await tokens.findOne({ refreshToken: refreshToken });
    if (!tokenInDb) throw new Error("You are not authorized");

    jwt.verify(refreshToken, REFRESH_SECRET, async (err, userData) => {
      if (err) throw new Error("You are not authenticated");

      const user = { ...userData, userId: new ObjectId(userData.userId) };

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      await tokens.deleteMany({ refreshToken: refreshToken });
      await tokens.insertOne({
        userId: user.userId,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
      return res
        .status(200)
        .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
  } catch (err) {
    return res.status(401).json(err.message);
  }
});

export default router;
