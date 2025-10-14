import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import UserRegister from "./pages/UserRegister";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
