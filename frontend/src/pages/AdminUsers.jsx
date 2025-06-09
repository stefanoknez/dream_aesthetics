import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", email: "" });

  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(
        `http://localhost:3000/api/users/${userId}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user role");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditForm({ username: user.username, email: user.email });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/users/${editingUserId}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err);
      alert("Failed to save user changes");
    }
  };

  const handleEditCancel = () => {
    setEditingUserId(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="p-2 border">
                  {editingUserId === user.id ? (
                    <input
                      name="username"
                      value={editForm.username}
                      onChange={handleEditChange}
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td className="p-2 border">
                  {editingUserId === user.id ? (
                    <input
                      name="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="p-2 border">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="p-1 border rounded"
                    disabled={editingUserId === user.id}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="CLINIC_ADMIN">CLINIC_ADMIN</option>
                  </select>
                </td>
                <td className="p-2 border space-x-2">
                  {editingUserId === user.id ? (
                    <>
                      <button
                        onClick={handleEditSave}
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}