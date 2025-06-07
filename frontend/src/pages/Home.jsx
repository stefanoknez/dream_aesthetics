import React from 'react';

export default function Home() {
  return (
    <div className="text-white bg-gray-950">
      <section id="about" className="min-h-screen flex items-center justify-center bg-black">
        <h2 className="text-4xl font-bold text-yellow-400">About Dream Aesthetics</h2>
      </section>

      <section id="clinics" className="min-h-screen flex items-center justify-center bg-gray-900">
        <h2 className="text-4xl font-bold text-red-400">Our Partner Clinics</h2>
      </section>

      <section id="support" className="min-h-screen flex items-center justify-center bg-black">
        <h2 className="text-4xl font-bold text-white">Customer Support</h2>
      </section>

      <section id="reviews" className="min-h-screen flex items-center justify-center bg-gray-900">
        <h2 className="text-4xl font-bold text-yellow-400">What Our Users Say</h2>
      </section>
    </div>
  );
}