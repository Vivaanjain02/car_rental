import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserDashboard() {
  const [cars, setCars] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    fetchCars();
  }, []);

  // ✅ Fetch cars from your backend API (correct Render URL)
  const fetchCars = async () => {
    try {
      const res = await axios.get("https://car-rental-backend-ximf.onrender.com/api/cars");
      setCars(res.data);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  // ✅ Filter cars by selected type
  const filteredCars =
    filterType === "All" ? cars : cars.filter((car) => car.type === filterType);

  // ✅ Sort cars by price
  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Available Cars</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex gap-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Types</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Coupe">Coupe</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="default">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedCars.map((car) => (
          <div
            key={car._id}
            className="bg-white p-4 rounded-lg shadow-md border text-center"
          >
            <img
              src={car.image}
              alt={car.model}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-bold">{car.model}</h3>
            <p className="text-gray-600">₹{car.price}</p>
            <p className="text-sm text-gray-500">{car.type}</p>
          </div>
        ))}

        {/* No cars found */}
        {sortedCars.length === 0 && (
          <p className="text-gray-600 col-span-full text-center">
            No cars available.
          </p>
        )}
      </div>
    </div>
  );
}
