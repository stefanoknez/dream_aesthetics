import React from "react";

export default function ClinicDashboard() {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Clinic Dashboard</h1>
      <p className="mb-4">Welcome, Clinic Admin! You can manage your clinic's info, appointments, and treatments.</p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="font-semibold">My Clinic Info</h2>
          <p>Update clinic details, contact, location.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="font-semibold">Appointments</h2>
          <p>View or respond to appointment requests.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="font-semibold">Treatments</h2>
          <p>Manage offered treatments.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="font-semibold">Photos</h2>
          <p>Upload promotional images for your clinic.</p>
        </div>
      </div>
    </div>
  );
}