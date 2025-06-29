import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminReview() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [comments, setComments] = useState([]);
  const [selected, setSelected] = useState([]);

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
      await axios.post(
        "http://localhost:3000/api/comments/bulk-delete",
        { ids: selected },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`
          }
        }
      );
      setSelected([]);
      fetchComments();
    } catch (err) {
      console.error("Bulk delete failed", err);
    }
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (!["ADMIN", "CLINIC_ADMIN"].includes(user?.role)) {
    return <div className="p-6 text-center">Access Denied</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Reviews</h1>

      {comments.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div>
          <button
            onClick={handleBulkDelete}
            disabled={selected.length === 0}
            className="mb-4 bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Delete Selected
          </button>

          <ul className="space-y-4">
            {comments.map((c) => (
              <li
                key={c.id}
                className="border p-4 rounded flex justify-between items-start bg-white shadow"
              >
                <div>
                  <p className="font-semibold">{c.User?.username || "Unknown user"}</p>
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
        </div>
      )}
    </div>
  );
}