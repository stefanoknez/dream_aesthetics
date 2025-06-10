import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import adm1 from "../assets/adm1.jpg";
import adm2 from "../assets/adm2.jpg";
import adm3 from "../assets/adm3.jpg";
import adm4 from "../assets/adm4.jpg";
import adm5 from "../assets/adm5.jpg";

const backgroundImages = [adm1, adm2, adm3, adm4, adm5];

export default function AdminDashboard() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentBg ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      </div>

      {/* Foreground content */}
      <div className="relative z-20 p-6">
        <div className="bg-white/50 backdrop-blur-md shadow-lg rounded-xl max-w-4xl mx-auto p-8 border border-white/30">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">ADMIN DASHBOARD</h1>
          <p className="mb-6 text-center text-gray-800 text-xl font-semibold">
            Welcome, Admin! Manage users, clinics, treatments, and uploaded content.
          </p>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Link to="/admin-users">
              <div className="p-4 bg-white/20 backdrop-blur-lg rounded-lg shadow-md border border-white/30 hover:scale-105 transform transition cursor-pointer">
                <h2 className="font-semibold text-lg text-gray-900">Users</h2>
                <p className="text-sm text-gray-800">View, edit or delete users.</p>
              </div>
            </Link>

            <Link to="/admin-clinics">
              <div className="p-4 bg-white/20 backdrop-blur-lg rounded-lg shadow-md border border-white/30 hover:scale-105 transform transition cursor-pointer">
                <h2 className="font-semibold text-lg text-gray-900">Clinics</h2>
                <p className="text-sm text-gray-800">Manage clinic data, photos and details.</p>
              </div>
            </Link>

            <Link to="/admin-treatments">
              <div className="p-4 bg-white/20 backdrop-blur-lg rounded-lg shadow-md border border-white/30 hover:scale-105 transform transition cursor-pointer">
                <h2 className="font-semibold text-lg text-gray-900">Treatments</h2>
                <p className="text-sm text-gray-800">Add or update treatments.</p>
              </div>
            </Link>

            <Link to="/admin-files">
              <div className="p-4 bg-white/20 backdrop-blur-lg rounded-lg shadow-md border border-white/30 hover:scale-105 transform transition cursor-pointer">
                <h2 className="font-semibold text-lg text-gray-900">Files</h2>
                <p className="text-sm text-gray-800">View and delete uploaded images.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}