import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <h1 className="text-5xl font-extrabold mb-8 drop-shadow-lg">
        🚗 Car Rental Portal
      </h1>

      <p className="text-lg mb-10 max-w-lg text-center opacity-90">
        Welcome to your all-in-one Car Rental System. Login as a <b>User</b> to
        explore and book cars, or as an <b>Admin</b> to manage your fleet.
      </p>

      <div className="flex space-x-6">
        <button
          onClick={() => navigate("/user-login")}
          className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-xl shadow-lg hover:bg-blue-100 transition-all duration-200"
        >
          User Login
        </button>
        <button
          onClick={() => navigate("/admin-login")}
          className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-xl shadow-lg hover:bg-yellow-300 transition-all duration-200"
        >
          Admin Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;
