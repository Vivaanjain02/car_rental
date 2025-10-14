import React, { useState, useEffect } from "react";

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem("cars")) || [];
    setCars(savedCars);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        🚗 Available Cars
      </h1>
      {cars.length === 0 ? (
        <p className="text-center text-gray-500">No cars available yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {cars.map((car, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              {car.image && (
                <img
                  src={car.image}
                  alt={car.model}
                  className="rounded-lg mb-3 w-full h-40 object-cover"
                />
              )}
              <h2 className="text-xl font-semibold">{car.model}</h2>
              <p className="text-gray-600">Type: {car.type}</p>
              <p className="text-green-600 font-semibold">
                Price: ₹{car.price}/day
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;
