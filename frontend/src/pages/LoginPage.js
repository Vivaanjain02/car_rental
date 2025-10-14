import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple static login validation (for demo)
    if (email === "admin@rentcar.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      alert("✅ Logged in as Admin");
      navigate("/car-list");
    } else if (email === "user@rentcar.com" && password === "user123") {
      localStorage.setItem("role", "user");
      alert("✅ Logged in as User");
      navigate("/car-list");
    } else {
      alert("❌ Invalid credentials! Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-blue-500 to-sky-400">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-96">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🚗 Car Rental Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold"
          >
            Login
          </button>
        </form>

        <div className="mt-6 bg-gray-100 p-3 rounded-lg text-sm text-gray-600">
          <p className="text-center font-semibold mb-1">Demo Credentials</p>
          <p>🧑‍💼 Admin → <b>admin@rentcar.com</b> / <b>admin123</b></p>
          <p>👤 User → <b>user@rentcar.com</b> / <b>user123</b></p>
        </div>
      </div>
    </div>
  );
}
