import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminFiles() {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/files", {
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
          axios.delete(`http://localhost:3000/api/files/${file}`, {
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
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Manage Files</h1>

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

      <h2 className="text-xl font-semibold mb-2">Uploaded Files</h2>
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
  );
}