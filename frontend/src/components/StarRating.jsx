import React from "react";

export default function StarRating({ value, onChange }) {
  const handleClick = (val) => onChange(val);

  return (
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-3xl cursor-pointer ${star <= value ? "text-yellow-400" : "text-gray-300"}`}
          onClick={() => handleClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}