import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Get existing users or empty array
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const userExists = existingUsers.find((user) => user.email === email);
    if (userExists) {
      alert("⚠️ User already exists! Please login instead.");
      return;
    }

    // Create new user object
    const newUser = { name, email, password };

    // Save to localStorage
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("✅ Registration Successful! Please login now.");
    navigate("/user-login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-teal-500">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Registration
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition-all"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-6 space-y-2">
          <button
            onClick={() => navigate("/user-login")}
            className="text-teal-600 hover:underline text-sm"
          >
            Already registered? Login here
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

export default UserRegister;
