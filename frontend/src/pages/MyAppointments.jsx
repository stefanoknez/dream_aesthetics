import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/appointments/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAppointments(res.data))
      .catch(() => alert("Failed to load appointments"));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">My Appointments</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Clinic</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td className="p-2 border">{a.Clinic?.name || "Unknown"}</td>
              <td className="p-2 border">{new Date(a.datetime).toLocaleString()}</td>
              <td className="p-2 border capitalize">{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}