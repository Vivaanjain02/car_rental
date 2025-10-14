import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@carrental.com" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      alert("✅ Welcome Admin!");
      navigate("/admin-dashboard");
    } else {
      alert("❌ Invalid Admin Credentials!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-300 to-orange-500">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-semibold py-2 rounded-lg hover:bg-yellow-300 transition-all"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
