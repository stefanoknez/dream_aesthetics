import React from 'react';

export default function Navbar() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-yellow-400">Dream Aesthetics</div>
        <div className="space-x-6 hidden md:flex">
          <button onClick={() => scrollToSection('about')} className="hover:text-yellow-400">About</button>
          <button onClick={() => scrollToSection('clinics')} className="hover:text-yellow-400">Clinics</button>
          <button onClick={() => scrollToSection('support')} className="hover:text-yellow-400">Support</button>
          <button onClick={() => scrollToSection('reviews')} className="hover:text-yellow-400">Reviews</button>
        </div>
        <div>
          <a href="/login" className="text-red-400 hover:text-red-300 mr-4">Sign In</a>
          <a href="/register" className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded">Sign Up</a>
        </div>
      </div>
    </nav>
  );
}