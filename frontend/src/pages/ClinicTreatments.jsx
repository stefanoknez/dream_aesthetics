import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ClinicTreatments() {
  const [treatments, setTreatments] = useState([]);
  const [allTreatments, setAllTreatments] = useState([]);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState("");
  const [error, setError] = useState("");
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  const fetchTreatments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/clinic-admin/treatments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTreatments(res.data);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch treatments (403/Unauthorized?)");
    }
  };

  const fetchAllTreatments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/clinic-admin/all-treatments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllTreatments(res.data);
    } catch (err) {
      console.error("Fetch all treatments error:", err);
    }
  };

  const addTreatment = async () => {
    if (!selectedTreatmentId) return;
    try {
      await axios.post(
        "http://localhost:3000/api/clinic-admin/treatments",
        { treatment_id: parseInt(selectedTreatmentId) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedTreatmentId("");
      fetchTreatments();
    } catch (err) {
      console.error("Add error:", err);
      setError("Failed to add treatment.");
    }
  };

  const removeTreatment = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/clinic-admin/treatments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTreatments();
    } catch (err) {
      console.error("Remove error:", err);
      setError("Failed to remove treatment.");
    }
  };

  useEffect(() => {
    fetchTreatments();
    fetchAllTreatments();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10 bg-white/60 backdrop-blur-md rounded-xl shadow-xl border border-white/30">
      <h1 className="text-2xl font-bold mb-4">Clinic Treatments</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <select
          value={selectedTreatmentId}
          onChange={(e) => setSelectedTreatmentId(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-2/3"
        >
          <option value="">-- Select Treatment --</option>
          {allTreatments.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <button
          onClick={addTreatment}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
        >
          Add Treatment
        </button>
      </div>

      {treatments.length === 0 ? (
        <p className="text-gray-700">No treatments assigned to this clinic.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {treatments.map((t, i) => (
            <li
              key={i}
              className="py-2 flex justify-between items-center hover:bg-gray-100 px-2 rounded"
            >
              <span>
                <strong>{t.name || t.Treatment?.name}</strong> –{" "}
                {t.description || t.Treatment?.description}
              </span>
              <button
                onClick={() => removeTreatment(t.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}