import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminTreatments() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);

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
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Manage Treatments</h1>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <input name="name" value={form.name} onChange={handleInputChange} placeholder="Name" className="p-2 border rounded" />
        <input name="description" value={form.description} onChange={handleInputChange} placeholder="Description" className="p-2 border rounded" />
        <button onClick={handleCreateOrUpdate} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {editingId ? "Update Treatment" : "Add Treatment"}
        </button>
        {editingId && (
          <button onClick={() => { setEditingId(null); setForm({ name: "", description: "" }); }} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
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
  );
}