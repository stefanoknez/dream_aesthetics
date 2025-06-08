import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminClinics() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", description: "", address: "", phone: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  const fetchClinics = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/clinics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClinics(res.data);
    } catch (err) {
      alert("Failed to fetch clinics");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:3000/api/clinics", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ name: "", description: "", address: "", phone: "", email: "" });
      fetchClinics();
    } catch (err) {
      alert("Failed to create clinic");
    }
  };

  const handleEdit = (clinic) => {
    setForm({ ...clinic });
    setEditingId(clinic.id);
  };

  const handleCancelEdit = () => {
    setForm({ name: "", description: "", address: "", phone: "", email: "" });
    setEditingId(null);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/clinics/${editingId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ name: "", description: "", address: "", phone: "", email: "" });
      setEditingId(null);
      fetchClinics();
    } catch (err) {
      alert("Failed to update clinic");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this clinic?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/clinics/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchClinics();
    } catch (err) {
      alert("Failed to delete clinic");
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Manage Clinics</h1>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <input name="name" value={form.name} onChange={handleInputChange} placeholder="Name" className="p-2 border rounded" />
        <input name="description" value={form.description} onChange={handleInputChange} placeholder="Description" className="p-2 border rounded" />
        <input name="address" value={form.address} onChange={handleInputChange} placeholder="Address" className="p-2 border rounded" />
        <input name="phone" value={form.phone} onChange={handleInputChange} placeholder="Phone" className="p-2 border rounded" />
        <input name="email" value={form.email} onChange={handleInputChange} placeholder="Email" className="p-2 border rounded md:col-span-1" />
        {editingId ? (
          <div className="flex space-x-2">
            <button onClick={handleUpdate} className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Update Clinic
            </button>
            <button onClick={handleCancelEdit} className="w-full bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Add Clinic
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading clinics...</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clinics.map((clinic) => (
              <tr key={clinic.id}>
                <td className="p-2 border">{clinic.name}</td>
                <td className="p-2 border">{clinic.description}</td>
                <td className="p-2 border">{clinic.address}</td>
                <td className="p-2 border">{clinic.phone}</td>
                <td className="p-2 border">{clinic.email}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(clinic)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(clinic.id)}
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