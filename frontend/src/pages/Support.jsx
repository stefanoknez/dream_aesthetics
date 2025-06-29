import React, { useState, useEffect } from "react";
import axios from "axios";
import bg1 from "../assets/codra.webp";
import bg2 from "../assets/milmedika.webp";
import bg3 from "../assets/milmedika2.jpg";
import bg4 from "../assets/milmedika3.webp";

const images = [bg1, bg2, bg3, bg4];

export default function Support() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/support", {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages");
    }
  };

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchMessages();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/support", formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Failed to send message.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/support/${id}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      fetchMessages();
    } catch {
      alert("Failed to delete message.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Pozadinske slike */}
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`bg-${idx}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ease-in-out ${
            bgIndex === idx ? "opacity-100 z-0" : "opacity-0"
          }`}
        />
      ))}

      {/* ADMIN View */}
      {user?.role === "ADMIN" ? (
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-start p-8">
          <h1 className="text-3xl font-bold mb-6 text-white bg-black/60 px-6 py-2 rounded-xl">
            Received Support Messages
          </h1>
          {messages.length === 0 ? (
            <p className="text-center text-white/80">No messages received yet.</p>
          ) : (
            <ul className="max-w-3xl w-full space-y-6">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200"
                >
                  <p><strong>Name:</strong> {msg.name}</p>
                  <p><strong>Email:</strong> {msg.email}</p>
                  <p><strong>Message:</strong> {msg.message}</p>
                  <div className="text-right mt-4">
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        // USER / CLINIC_ADMIN View
        <div className="relative z-10 max-w-5xl mx-auto p-6 mt-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl flex flex-col lg:flex-row">
          <form onSubmit={handleSubmit} className="w-full lg:w-2/3 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border border-gray-300 p-3 rounded w-full"
                required
              />
              <input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border border-gray-300 p-3 rounded w-full"
                required
              />
            </div>
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="border border-gray-300 p-3 rounded w-full h-32 mb-4"
              required
            />
            <button
              type="submit"
              className="bg-gray-800 hover:bg-black text-white px-6 py-2 rounded"
            >
              Send Message
            </button>
          </form>

          <div className="w-full lg:w-1/3 mt-10 lg:mt-0 lg:ml-8 flex flex-col justify-center bg-gray-800 text-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold uppercase mb-4">Address</h3>
            <p className="mb-4 font-medium">Topolska 18, 81000<br />Podgorica, Montenegro</p>
            <h3 className="text-lg font-semibold uppercase mb-2">Email</h3>
            <p className="text-white font-medium">aesthetics@dream.me</p>
          </div>
        </div>
      )}
    </div>
  );
}