import jwt from "jsonwebtoken";
import { ACCESS_SECRET, REFRESH_SECRET } from "../config.js";

const generateAccessToken = ({ userId, email, name }) => {
  return jwt.sign({ userId, email, name }, ACCESS_SECRET, { expiresIn: '5m' });
};
const generateRefreshToken = ({ userId, email, name }) => {
  return jwt.sign({ userId, email, name }, REFRESH_SECRET);
};

const verify = (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) throw new Error("You are not authenticated");

    const token = authHeaders.split(" ")[1];
    jwt.verify(token, ACCESS_SECRET, (err, user) => {
      if (err) throw new Error("Access Token is not valid");
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(401).json(err.message);
  }
};

export { generateAccessToken, generateRefreshToken, verify };
