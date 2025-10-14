import React, { useEffect, useState } from "react";
import axios from "axios";

const UserCarList = () => {
  const [cars, setCars] = useState([]);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetchCars();
  }, [filterType]);

  const fetchCars = async () => {
    try {
      const url = filterType
        ? `http://localhost:5001/api/cars?type=${filterType}`
        : `http://localhost:5001/api/cars`;
      const res = await axios.get(url);
      setCars(res.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10 drop-shadow-md">
        🚗 Available Cars for Rent
      </h1>

      {/* Filter Dropdown */}
      <div className="flex justify-center mb-10">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-3 border rounded-lg shadow bg-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Cars</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="SUV">SUV</option>
          <option value="Coupe">Coupe</option>
        </select>
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 p-4 flex flex-col items-center"
            >
              <img
                src={
                  car.image ||
                  "https://cdn.pixabay.com/photo/2016/12/06/18/27/car-1880381_1280.jpg"
                }
                alt={car.name}
                className="rounded-lg h-48 w-full object-cover mb-4"
                onError={(e) =>
                  (e.target.src =
                    "https://cdn.pixabay.com/photo/2016/12/06/18/27/car-1880381_1280.jpg")
                }
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{car.name}</h2>
              <p className="text-gray-600">Model: {car.model}</p>
              <p className="text-gray-500 italic">{car.type}</p>
              <p className="text-lg text-blue-700 font-semibold mt-3">
                ₹{car.price} / day
              </p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Rent Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">No cars available.</p>
        )}
      </div>
    </div>
  );
};

export default UserCarList;
