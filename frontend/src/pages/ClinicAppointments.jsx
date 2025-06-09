import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ClinicAppointments() {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/appointments", {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      setAppointments(res.data);
    } catch (err) {
      alert("Failed to load appointments");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:3000/api/appointments/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      fetchAppointments();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      fetchAppointments();
    } catch (err) {
      alert("Failed to delete appointment");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto mt-10 bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">User</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id} className="text-center">
              <td className="border p-2">{a.User?.username || a.user_id}</td>
              <td className="border p-2">{new Date(a.datetime).toLocaleString()}</td>
              <td className="border p-2">{a.status.toUpperCase()}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => updateStatus(a.id, "APPROVED")}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(a.id, "REJECTED")}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Reject
                </button>
                <button
                  onClick={() => deleteAppointment(a.id)}
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}