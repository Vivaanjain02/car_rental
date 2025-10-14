const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["SUV", "Sedan", "Hatchback", "Coupe"],
    required: true,
  },
});

module.exports = mongoose.model("Car", carSchema);
