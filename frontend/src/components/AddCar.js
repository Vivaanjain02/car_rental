import React, { useState } from "react";
import axios from "axios";

const AddCar = () => {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/cars", formData);
      alert("✅ Car added successfully!");
      console.log("Added car:", res.data);
      setFormData({ name: "", model: "", price: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add car. Make sure backend is running!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
        Add New Car 🚘
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Car Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="model"
          placeholder="Car Model"
          value={formData.model}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price per day (₹)"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
