// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const getDashboardRoute = () => {
    if (!user) return "/";
    if (user.role === "ADMIN") return "/admin-dashboard";
    if (user.role === "CLINIC_ADMIN") return "/clinic-dashboard";
    return "/dashboard";
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white flex justify-between items-center p-4 shadow-md">
      <Link
        to={getDashboardRoute()}
        className="text-yellow-400 font-bold text-xl hover:text-yellow-300"
      >
        Dream Aesthetics
      </Link>
      <div className="space-x-4">
        <Link to="/about">About</Link>
        <Link to="/clinics">Clinics</Link>
        <Link to="/support">Support</Link>
        <Link to="/reviews">Reviews</Link>
        {user && (
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}