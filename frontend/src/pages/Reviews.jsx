import React from "react";

export default function Reviews() {
  const reviews = [
    {
      user: "Ana K.",
      text: "Dream Aesthetics helped me find the perfect clinic for my needs. Highly recommend!",
    },
    {
      user: "Miloš P.",
      text: "Professional platform with reliable recommendations."
    },
    {
      user: "Ivana M.",
      text: "I loved the detailed analysis and how it directed me to the best treatment."
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Reviews</h1>
      <ul className="space-y-4">
        {reviews.map((review, idx) => (
          <li key={idx} className="border p-4 rounded bg-white shadow">
            <p className="font-semibold">{review.user}</p>
            <p className="text-gray-700">{review.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}