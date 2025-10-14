const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

// ✅ Get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add a new car
router.post("/", async (req, res) => {
  try {
    const { model, price, type } = req.body;
    if (!model || !price || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCar = new Car({ model, price, type });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a car
router.delete("/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
