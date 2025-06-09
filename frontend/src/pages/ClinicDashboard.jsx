import React, { useState, useEffect } from "react";
import ClinicInfo from "./ClinicInfo";
import ClinicAppointments from "./ClinicAppointments";
import ClinicTreatments from "./ClinicTreatments";
import ClinicPhotos from "./ClinicPhotos";

import bg1 from "../assets/bg1.webp";
import bg2 from "../assets/bg2.webp";
import bg3 from "../assets/bg3.jpeg";
import bg4 from "../assets/bg4.jpeg";
import bg5 from "../assets/bg5.jpg";

const backgroundImages = [bg1, bg2, bg3, bg4, bg5];

export default function ClinicDashboard() {
  const [visibleSection, setVisibleSection] = useState(null);
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
        <div className="bg-white/30 backdrop-blur-md shadow-lg rounded-xl max-w-4xl mx-auto p-8 border border-white/30">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">CLINIC ADMIN</h1>
          <p className="mb-6 text-center text-gray-800 text-xl font-semibold">
            Welcome, Clinic Admin! You can manage your clinic's info, appointments, and treatments.
          </p>

          {/* Navigation Cards */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {[
              {
                key: "info",
                title: "My Clinic Info",
                desc: "Update clinic details, contact, location.",
              },
              {
                key: "appointments",
                title: "Appointments",
                desc: "View or respond to appointment requests.",
              },
              {
                key: "treatments",
                title: "Treatments",
                desc: "Manage offered treatments.",
              },
              {
                key: "photos",
                title: "Photos",
                desc: "Upload promotional images for your clinic.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="p-4 rounded-xl shadow-lg border border-white/20 bg-white/30 backdrop-blur-md cursor-pointer transition transform hover:scale-105 duration-300"
                onClick={() => setVisibleSection(item.key)}
              >
                <h2 className="font-semibold text-lg text-gray-900">{item.title}</h2>
                <p className="text-sm text-gray-800">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Section Content */}
          <div className="mt-8">
            {visibleSection === "info" && <ClinicInfo />}
            {visibleSection === "appointments" && <ClinicAppointments />}
            {visibleSection === "treatments" && <ClinicTreatments />}
            {visibleSection === "photos" && <ClinicPhotos />}
          </div>
        </div>
      </div>
    </div>
  );
}