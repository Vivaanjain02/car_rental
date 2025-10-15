import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("SUV");

  // ✅ Automatically use Render URL in production and localhost for development
  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://car-rental-backend-ximf.onrender.com/api/cars"
      : "http://localhost:5001/api/cars";

  useEffect(() => {
    fetchCars();
  }, []);

  // ✅ Fetch all cars
  const fetchCars = async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      setCars(res.data);
    } catch (err) {
      console.error("🚨 Error fetching cars:", err.message);
      if (err.response) {
        console.error("Response error:", err.response.status, err.response.data);
      } else if (err.request) {
        console.error("No response from server. Check backend connection.");
      } else {
        console.error("Request setup error:", err.message);
      }
    }
  };

  // ✅ Add a new car
  const addCar = async () => {
    if (!model || !price) {
      alert("Please enter all fields");
      return;
    }
    try {
      await axios.post(API_BASE_URL, { model, price, type });
      setModel("");
      setPrice("");
      setType("SUV");
      fetchCars();
    } catch (err) {
      console.error("🚨 Failed to add car:", err);
      alert("Failed to add car. Check backend connection.");
    }
  };

  // ✅ Delete a car
  const deleteCar = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchCars();
    } catch (err) {
      console.error("🚨 Failed to delete car:", err);
      alert("Failed to delete car");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Add Car Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Add a New Car</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Car Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Coupe">Coupe</option>
          </select>
          <button
            onClick={addCar}
            className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
          >
            Add Car
          </button>
        </div>
      </div>

      {/* Cars List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white p-4 rounded-lg shadow-md border flex flex-col justify-between"
          >
            <img
              src={car.image || "https://via.placeholder.com/400x200?text=No+Image"}
              alt={car.model}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <div>
              <h3 className="text-lg font-bold">{car.model}</h3>
              <p className="text-gray-600">₹{car.price}</p>
              <p className="text-sm text-gray-500">{car.type}</p>
            </div>
            <button
              onClick={() => deleteCar(car._id)}
              className="bg-red-500 text-white px-3 py-1 mt-3 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
