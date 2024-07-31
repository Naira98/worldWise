import { db } from "../db.js";

export const users = db.collection("users");
export const tokens = db.collection("tokens");
export const cities = db.collection("cities");
