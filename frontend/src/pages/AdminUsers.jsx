import React, { useEffect, useState } from "react";
import axios from "axios";
import bg1 from "../assets/adm1.jpg";
import bg2 from "../assets/adm2.jpg";
import bg3 from "../assets/adm3.jpg";
import bg4 from "../assets/adm4.jpg";
import bg5 from "../assets/adm5.jpg";

const backgroundImages = [bg1, bg2, bg3, bg4, bg5];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", email: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [addUserForm, setAddUserForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
    clinic_id: ""
  });
  const [currentBg, setCurrentBg] = useState(0);

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

  const fetchClinics = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/clinics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClinics(res.data);
    } catch (err) {
      console.error("Error fetching clinics:", err);
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

  const handleAddUserChange = (e) => {
    setAddUserForm({ ...addUserForm, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/users",
        addUserForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAddUserForm({ username: "", email: "", password: "", role: "USER", clinic_id: "" });
      setShowAddForm(false);
      fetchUsers();
    } catch (err) {
      console.error("Error adding user:", err);
      alert("Failed to create user");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchClinics();
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentBg ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      </div>

      {/* Foreground content */}
      <div className="relative z-20 p-6">
        <div className="bg-white/60 backdrop-blur-md shadow-lg rounded-xl max-w-5xl mx-auto p-8 border border-white/30">
          <h1 className="text-3xl font-bold mb-4 flex justify-between items-center">
            Manage Users
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              {showAddForm ? "Cancel" : "Add User"}
            </button>
          </h1>

          {showAddForm && (
            <div className="mb-6 p-4 bg-white/60 border border-white/30 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  name="username"
                  value={addUserForm.username}
                  onChange={handleAddUserChange}
                  placeholder="Username"
                  className="p-2 border rounded"
                />
                <input
                  name="email"
                  value={addUserForm.email}
                  onChange={handleAddUserChange}
                  placeholder="Email"
                  className="p-2 border rounded"
                />
                <input
                  name="password"
                  type="password"
                  value={addUserForm.password}
                  onChange={handleAddUserChange}
                  placeholder="Password"
                  className="p-2 border rounded"
                />
                <select
                  name="role"
                  value={addUserForm.role}
                  onChange={handleAddUserChange}
                  className="p-2 border rounded"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="CLINIC_ADMIN">CLINIC_ADMIN</option>
                </select>
                {addUserForm.role === "CLINIC_ADMIN" && (
                  <select
                    name="clinic_id"
                    value={addUserForm.clinic_id}
                    onChange={handleAddUserChange}
                    className="p-2 border rounded"
                  >
                    <option value="">-- Select Clinic --</option>
                    {clinics.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                )}
              </div>
              <button
                onClick={handleAddUser}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Create User
              </button>
            </div>
          )}

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
      </div>
    </div>
  );
}