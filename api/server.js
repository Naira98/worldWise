import express from "express";

import "./db.js";
import authRouters from "./routes/auth.js";
import actioRouters from "./routes/actions.js";

const app = express();

app.use(express.json());
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  next();
});

app.use("/auth", authRouters);
app.use("/api", actioRouters);

app.listen(3000, () => console.log("Server runing in port 3000"));
