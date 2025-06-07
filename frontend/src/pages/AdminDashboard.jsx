import React from "react";

export default function AdminDashboard() {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4">Welcome, Admin! You can manage users, clinics, treatments, and content from here.</p>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="font-semibold">Users</h2>
          <p>View, edit or delete users.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="font-semibold">Clinics</h2>
          <p>Manage clinic data, photos and details.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="font-semibold">Treatments</h2>
          <p>Add or update treatments.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="font-semibold">Files</h2>
          <p>Upload and manage images or documents.</p>
        </div>
      </div>
    </div>
  );
}