import React, { useEffect, useState } from "react";
import axios from "axios";

import adm1 from "../assets/adm1.jpg";
import adm2 from "../assets/adm2.jpg";
import adm3 from "../assets/adm3.jpg";
import adm4 from "../assets/adm4.jpg";
import adm5 from "../assets/adm5.jpg";

const bgImages = [adm1, adm2, adm3, adm4, adm5];

export default function AdminFiles() {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);

  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/files/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(res.data);
    } catch (err) {
      console.error("Error fetching files:", err);
      alert("Failed to load files");
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedFiles.length === 0) return;
    if (!window.confirm("Delete selected files?")) return;
    try {
      await Promise.all(
        selectedFiles.map((file) =>
          axios.delete(`http://localhost:3000/api/files/admin/${file}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      setSelectedFiles([]);
      setSelectAll(false);
      fetchFiles();
    } catch (err) {
      console.error("Error deleting files:", err);
      alert("Delete failed");
    }
  };

  const toggleSelectFile = (file) => {
    setSelectedFiles((prev) =>
      prev.includes(file) ? prev.filter((f) => f !== file) : [...prev, file]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles([...files]);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    fetchFiles();
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out">
        {bgImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentBg ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black opacity-50 z-10" />
      </div>

      {/* Foreground content */}
      <div className="relative z-20 p-6">
        <div className="bg-white/60 backdrop-blur-md shadow-lg rounded-xl max-w-4xl mx-auto p-8 border border-white/30">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">Manage Uploaded Files</h1>

          <div className="mb-4 flex justify-between items-center">
            <button
              onClick={toggleSelectAll}
              className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
            >
              {selectAll ? "Unselect All" : "Select All"}
            </button>
            <button
              onClick={handleDeleteSelected}
              className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              disabled={selectedFiles.length === 0}
            >
              Delete Selected ({selectedFiles.length})
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-2 text-gray-800">Uploaded Files</h2>
          <ul className="list-none pl-0">
            {files.map((file, idx) => (
              <li key={idx} className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file)}
                    onChange={() => toggleSelectFile(file)}
                  />
                  <a
                    href={`http://localhost:3000/uploads/${file}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    {file}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}