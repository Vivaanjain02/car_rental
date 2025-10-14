import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Environment Variables
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5001;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// ✅ MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Schemas
const carSchema = new mongoose.Schema({
  model: String, // changed from name to model to match frontend
  price: Number,
  type: String,
  image: String,
});
const Car = mongoose.model("Car", carSchema);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// ✅ Admin Credentials
const ADMIN_EMAIL = "admin@carrental.com";
const ADMIN_PASSWORD = "admin123";

// ✅ Fetch Car Image from Unsplash
async function getCarImage(query) {
  try {
    if (!UNSPLASH_ACCESS_KEY) {
      console.log("⚠️ No Unsplash key found — using placeholder");
      return "https://via.placeholder.com/400x300?text=Car+Image";
    }

    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.small;
    } else {
      return "https://via.placeholder.com/400x300?text=Car+Image";
    }
  } catch (err) {
    console.error("❌ Error fetching image:", err);
    return "https://via.placeholder.com/400x300?text=Car+Image";
  }
}

// ✅ ROUTES

// Get all cars
app.get("/api/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cars" });
  }
});

// Add a car
app.post("/api/cars", async (req, res) => {
  try {
    const { model, price, type } = req.body;

    if (!model || !price || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("🟢 Adding Car:", model, price, type);

    const imageUrl = await getCarImage(`${model} ${type}`);
    const newCar = new Car({ model, price, type, image: imageUrl });

    await newCar.save();
    console.log("✅ Car saved successfully:", newCar);

    res.json({ message: "Car added successfully", car: newCar });
  } catch (err) {
    console.error("❌ Error adding car:", err);
    res.status(500).json({ message: "Failed to add car" });
  }
});

// Delete a car
app.delete("/api/cars/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting car" });
  }
});

// Register user
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ email, password });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ role: "admin" });
  }

  const user = await User.findOne({ email, password });
  if (user) {
    return res.json({ role: "user" });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
