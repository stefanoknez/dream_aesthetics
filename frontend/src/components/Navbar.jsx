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
    <nav className="bg-black text-white px-8 py-5 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to={getDashboardRoute()}
          className="text-yellow-400 font-extrabold text-3xl tracking-wide hover:text-yellow-300 transition"
        >
          Dream Aesthetics
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-base font-semibold">
          <Link
            to="/about"
            className="hover:text-yellow-300 transition duration-200"
          >
            About
          </Link>
          <Link
            to="/clinics"
            className="hover:text-yellow-300 transition duration-200"
          >
            Clinics
          </Link>
          <Link
            to="/support"
            className="hover:text-yellow-300 transition duration-200"
          >
            Support
          </Link>
          <Link
            to="/reviews"
            className="hover:text-yellow-300 transition duration-200"
          >
            Reviews
          </Link>

          {user && (
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md text-base transition"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}