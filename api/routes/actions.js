import express from "express";
import { verify } from "../lib/helpers.js";
import { cities } from "../models/collections.js";
import { ObjectId } from "bson";
const router = express.Router();

router.get("/cities", verify, async (req, res) => {
  try {
    const allCities = await cities
      .find({ userId: new ObjectId(req.user.userId) })
      .toArray();
    return res.status(200).json(allCities);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});
router.get(`/cities/:cityId`, verify, async (req, res) => {
  try {
    const cityId = req.params.cityId;
    const city = await cities.findOne({ _id: new ObjectId(cityId) });
    if (!city) throw new Error("City not found");
    return res.status(200).json(city);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
router.post("/cities", verify, async (req, res) => {
  try {
    const newCity = req.body;
    if (!newCity) throw new Error("No city to be added");
    const addedCity = await cities.insertOne({
      ...newCity,
      userId: new ObjectId(req.user.userId),
    });
    return res.status(200).json({ ...newCity, _id: addedCity.insertedId });
  } catch (err) {
    res.status(500).json(err.message);
  }
});
router.delete("/cities/:cityId", verify, async (req, res) => {
  try {
    const cityId = req.params.cityId;
    const city = await cities.findOne({ _id: new ObjectId(cityId) });
    await cities.findOneAndDelete({ _id: new ObjectId(cityId) });
    return res.status(200).json("City deleted successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;
