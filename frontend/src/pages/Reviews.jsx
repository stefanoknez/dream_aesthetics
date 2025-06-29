import React, { useEffect, useState } from "react";
import axios from "axios";
import bg1 from "../assets/codra.webp";
import bg2 from "../assets/milmedika.webp";
import bg3 from "../assets/milmedika2.jpg";
import bg4 from "../assets/milmedika3.webp";

const images = [bg1, bg2, bg3, bg4];

export default function Reviews() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/comments");
      setComments(res.data || []);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/comments", {
        text,
        platform_rating: rating
      }, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });
      setText("");
      setRating(0);
      fetchComments();
    } catch (err) {
      alert("Failed to submit");
    }
  };

  const handleStarClick = (val) => {
    setRating(val);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });
      fetchComments();
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await axios.post("http://localhost:3000/api/comments/bulk-delete", {
        ids: selected
      }, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });
      setSelected([]);
      fetchComments();
    } catch (err) {
      console.error("Bulk delete failed", err);
    }
  };

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
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

      <div className="relative z-10 max-w-4xl mx-auto mt-10 p-6 bg-white/80 rounded-2xl shadow-xl backdrop-blur">
        <h1 className="text-3xl font-bold mb-6 text-center">Rate Dream Aesthetics</h1>

        {(user?.role === "USER" || user?.role === "CLINIC_ADMIN") && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Your experience..."
              required
              className="w-full p-3 border rounded"
            />
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((val) => (
                <span
                  key={val}
                  onClick={() => handleStarClick(val)}
                  className={`text-3xl cursor-pointer ${
                    val <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <button
              type="submit"
              className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-black"
            >
              Submit Review
            </button>
          </form>
        )}

        {/* Pregled recenzija */}
        <div className="mt-10">
          {user?.role === "ADMIN" ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">All Reviews (Admin)</h2>
              {selected.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="mb-4 bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete Selected ({selected.length})
                </button>
              )}
              {comments.length === 0 ? (
                <p className="text-gray-600">No reviews found.</p>
              ) : (
                <ul className="space-y-4">
                  {comments.map((c) => (
                    <li key={c.id} className="bg-white p-4 border rounded shadow-sm flex justify-between">
                      <div>
                        <p className="text-gray-800 font-semibold">{c.User?.username || "Unknown"}</p>
                        <p className="text-gray-700 mt-1">{c.text}</p>
                        <p className="text-sm text-yellow-600 mt-1">
                          Rating: {c.platform_rating} ★
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <input
                          type="checkbox"
                          checked={selected.includes(c.id)}
                          onChange={() => toggleSelect(c.id)}
                          className="mb-2"
                        />
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
              {comments.filter(c => c.user_id === user?.id).length === 0 ? (
                <p className="text-gray-600">No reviews yet.</p>
              ) : (
                <ul className="space-y-4">
                  {comments.filter(c => c.user_id === user.id).map((c) => (
                    <li key={c.id} className="bg-white p-4 border rounded shadow-sm">
                      <p className="text-gray-800">{c.text}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Rating: {c.platform_rating} ⭐
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}