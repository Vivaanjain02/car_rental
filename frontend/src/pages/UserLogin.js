import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Fetch users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    const validUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      alert(`✅ Welcome, ${validUser.name}!`);
      navigate("/user-dashboard");
    } else {
      alert("❌ Invalid credentials. Please register first.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6 space-y-2">
          <button
            onClick={() => navigate("/user-register")}
            className="text-indigo-600 hover:underline text-sm"
          >
            New user? Register here
          </button>
          <br />
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

export default UserLogin;
