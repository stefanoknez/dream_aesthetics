import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4">
        Welcome, Admin! You can manage users, clinics, treatments, and content from here.
      </p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Link to="/admin-users">
          <div className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 cursor-pointer transition">
            <h2 className="font-semibold">Users</h2>
            <p>View, edit or delete users.</p>
          </div>
        </Link>

        <Link to="/admin-clinics">
          <div className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 cursor-pointer transition">
            <h2 className="font-semibold">Clinics</h2>
            <p>Manage clinic data, photos and details.</p>
          </div>
        </Link>

        <Link to="/admin-treatments">
          <div className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 cursor-pointer transition">
            <h2 className="font-semibold">Treatments</h2>
            <p>Add or update treatments.</p>
          </div>
        </Link>

        <Link to="/admin-files">
          <div className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 cursor-pointer transition">
            <h2 className="font-semibold">Files</h2>
            <p>View and delete uploaded images.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}