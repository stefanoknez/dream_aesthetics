import React, { useEffect, useState } from "react";
import codra from "../assets/codra.webp";
import milmedika from "../assets/milmedika.webp";
import milmedika2 from "../assets/milmedika2.jpg";
import milmedika3 from "../assets/milmedika3.webp";

const images = [codra, milmedika, milmedika2, milmedika3];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // svakih 4 sekunde

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Slideshow pozadina */}
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`bg-${idx}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ease-in-out ${
            currentIndex === idx ? "opacity-100 z-0" : "opacity-0"
          }`}
        />
      ))}

      {/* Sadržajni blok */}
      <div className="relative z-10 max-w-4xl mx-auto p-6 mt-10 bg-white/80 rounded-2xl shadow-lg backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-4">About Dream Aesthetics</h1>
        <p className="mb-4 text-gray-700">
          Dream Aesthetics is a platform designed to help individuals discover the most suitable aesthetic treatments based on their personal needs and facial analysis.
          By combining advanced AI-driven image analysis and verified clinic databases, we provide users with personalized recommendations and allow them to schedule appointments with certified clinics.
        </p>
        <p className="mb-4 text-gray-700">
          Our mission is to bridge the gap between technology and beauty, ensuring that everyone can access tailored advice, trustable services, and safe treatment options. 
          Whether you're looking for skincare improvements, mole analysis, or considering botox, Dream Aesthetics is your reliable partner.
        </p>
        <p className="mb-4 text-gray-700">
          Founded in 2025, we collaborate with renowned dermatologists, aestheticians, and developers to make beauty advice more scientific, accessible, and transparent.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Advanced facial analysis using state-of-the-art AI</li>
          <li>Wide database of certified clinics</li>
          <li>Easy appointment scheduling with live availability</li>
          <li>Secure data handling and privacy-first approach</li>
          <li>Transparent and science-based recommendations</li>
        </ul>
      </div>
    </div>
  );
}