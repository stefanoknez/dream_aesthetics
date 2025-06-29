import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import About from "./About";
import Clinics from "./Clinics";
import Support from "./Support";
import Reviews from "./Reviews";

export default function Home() {
  const [hostname, setHostname] = useState("");

  useEffect(() => {
    fetch("/hostname")
      .then((res) => res.text())
      .then((text) => setHostname(text))
      .catch(() => setHostname("Could not fetch hostname"));
  }, []);

  return (
    <div className="text-white bg-gray-950 scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 text-white shadow-md flex justify-between items-center px-6 py-4">
        <ScrollLink
          to="welcome"
          smooth={true}
          duration={600}
          className="text-yellow-400 text-2xl font-bold cursor-pointer hover:text-yellow-300"
        >
          Dream Aesthetics
        </ScrollLink>
        <div className="space-x-6 text-sm font-medium hidden md:flex">
          <ScrollLink to="about" smooth={true} duration={600} className="cursor-pointer hover:text-yellow-300">
            About
          </ScrollLink>
          <ScrollLink to="clinics" smooth={true} duration={600} className="cursor-pointer hover:text-yellow-300">
            Clinics
          </ScrollLink>
          <ScrollLink to="support" smooth={true} duration={600} className="cursor-pointer hover:text-yellow-300">
            Support
          </ScrollLink>
          <ScrollLink to="reviews" smooth={true} duration={600} className="cursor-pointer hover:text-yellow-300">
            Reviews
          </ScrollLink>
          <RouterLink to="/login" className="hover:text-yellow-300">
            Sign In
          </RouterLink>
          <RouterLink to="/register" className="hover:text-yellow-300">
            Sign Up
          </RouterLink>
        </div>
      </nav>

      {/* Hero / Welcome Section */}
      <section
        id="welcome"
        className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-gray-900 text-center px-4 pt-24"
      >
        <h1 className="text-5xl font-bold text-yellow-400 mb-6 drop-shadow-lg">
          Welcome to Dream Aesthetics
        </h1>
        <p className="text-xl text-white mb-4 max-w-2xl">
          Your AI-powered companion for beauty, confidence, and care.
        </p>

        {/* HOSTNAME prikaz iz backend kontejnera */}
        <p className="text-sm text-gray-400 italic mb-8">{hostname}</p>

        <ScrollLink
          to="about"
          smooth={true}
          duration={600}
          className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
        >
          Learn More
        </ScrollLink>
      </section>

      {/* Scrollable Sections */}
      <section id="about">
        <About />
      </section>

      <section id="clinics">
        <Clinics />
      </section>

      <section id="support">
        <Support />
      </section>

      <section id="reviews">
        <Reviews />
      </section>
    </div>
  );
}