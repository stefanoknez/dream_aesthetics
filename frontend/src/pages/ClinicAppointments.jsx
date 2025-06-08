import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ClinicAppointments() {
  const [appointments, setAppointments] = useState([]);

  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/clinic-admin/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      alert("Failed to fetch appointments.");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:3000/api/clinic-admin/appointments/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAppointments();
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td className="p-2 border">{a.user_id}</td>
              <td className="p-2 border">{a.date}</td>
              <td className="p-2 border">{a.status}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="bg-green-500 text-white px-2 rounded"
                  onClick={() => updateStatus(a.id, "APPROVED")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-2 rounded"
                  onClick={() => updateStatus(a.id, "REJECTED")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
