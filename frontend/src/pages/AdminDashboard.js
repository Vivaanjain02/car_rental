import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("SUV");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/cars");
      setCars(res.data);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  const addCar = async () => {
    try {
      await axios.post("http://localhost:5001/api/cars", { model, price, type });
      setModel("");
      setPrice("");
      setType("SUV");
      fetchCars();
    } catch (err) {
      alert("Failed to add car");
    }
  };

  const deleteCar = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/cars/${id}`);
      fetchCars();
    } catch (err) {
      alert("Failed to delete car");
    }
  };

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white p-4 rounded-lg shadow-md border flex flex-col justify-between"
          >
            <img
              src={car.image}
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
