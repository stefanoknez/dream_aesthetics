import React, { useState, useEffect } from "react";
import axios from "axios";
import bg1 from "../assets/adm1.jpg";
import bg2 from "../assets/adm2.jpg";
import bg3 from "../assets/adm3.jpg";
import bg4 from "../assets/adm4.jpg";
import bg5 from "../assets/adm5.jpg";

const backgroundImages = [bg1, bg2, bg3, bg4, bg5];

export default function AdminTreatments() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [currentBg, setCurrentBg] = useState(0);

  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  const fetchTreatments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/treatments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTreatments(res.data);
    } catch (err) {
      alert("Failed to fetch treatments");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/api/treatments/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:3000/api/treatments", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({ name: "", description: "" });
      setEditingId(null);
      fetchTreatments();
    } catch (err) {
      alert("Failed to save treatment");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this treatment?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/treatments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTreatments();
    } catch (err) {
      alert("Failed to delete treatment");
    }
  };

  const handleEdit = (treatment) => {
    setForm({ name: treatment.name, description: treatment.description });
    setEditingId(treatment.id);
  };

  useEffect(() => {
    fetchTreatments();
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
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
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      </div>

      <div className="relative z-20 p-6">
        <div className="bg-white/60 backdrop-blur-md shadow-lg rounded-xl max-w-5xl mx-auto p-8 border border-white/30">
          <h1 className="text-3xl font-bold mb-6">Manage Treatments</h1>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <input
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="p-2 border rounded"
            />
            <input
              name="description"
              value={form.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="p-2 border rounded"
            />
            <button
              onClick={handleCreateOrUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editingId ? "Update Treatment" : "Add Treatment"}
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setForm({ name: "", description: "" });
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>

          {loading ? (
            <p>Loading treatments...</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {treatments.map((treatment) => (
                  <tr key={treatment.id}>
                    <td className="p-2 border">{treatment.name}</td>
                    <td className="p-2 border">{treatment.description}</td>
                    <td className="p-2 border space-x-2">
                      <button
                        onClick={() => handleEdit(treatment)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(treatment.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}