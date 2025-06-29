import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ClinicInfo() {
  const [clinic, setClinic] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: ""
  });

  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  const fetchClinic = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/clinic-admin/my-clinic", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClinic(res.data);
      setForm(res.data);
    } catch (err) {
      console.error("Failed to load clinic:", err);
      alert("Failed to fetch clinic data");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:3000/api/clinic-admin/my-clinic", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Clinic info updated successfully.");
      fetchClinic(); // Refresh
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update clinic info.");
    }
  };

  useEffect(() => {
    fetchClinic();
  }, []);

  if (!clinic) return <p className="p-4">Loading...</p>;

  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-6 max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">My Clinic Info</h1>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Clinic name"
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Clinic description"
          />
        </div>
        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Address"
          />
        </div>
        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Phone number"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Email address"
          />
        </div>
      </div>

      <button
        onClick={handleUpdate}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Update Clinic Info
      </button>
    </div>
  );
}

