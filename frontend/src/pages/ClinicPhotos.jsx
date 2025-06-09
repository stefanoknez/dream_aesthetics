// ClinicPhotos.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ClinicPhotos() {
  const [photos, setPhotos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  const fetchPhotos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/files", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPhotos(res.data);
    } catch (err) {
      alert("Failed to load photos");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      await axios.post("http://localhost:3000/api/files/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSelectedFile(null);
      fetchPhotos();
    } catch (err) {
      alert("Upload failed");
    }
  };

  const deletePhoto = async (filename) => {
    try {
      await axios.delete(`http://localhost:3000/api/files/${filename}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPhotos();
    } catch (err) {
      alert("Failed to delete photo");
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-6 max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Upload Clinic Photos</h2>

      <div className="mb-2">
        <label className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded border border-gray-300 cursor-pointer hover:bg-gray-200">
          Browse...
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="hidden"
          />
        </label>
        {selectedFile && <span className="ml-3 text-sm text-gray-600">{selectedFile.name}</span>}
      </div>

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-1 rounded mt-2"
      >
        Upload
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Uploaded Photos</h3>
        {photos.length === 0 ? (
          <p className="text-gray-500">No photos uploaded.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div key={photo.id || photo.filename} className="relative group">
                <img
                  src={`http://localhost:3000/uploads/${photo.filename}`}
                  alt="Clinic"
                  className="w-full h-40 object-cover rounded"
                />
                <button
                  onClick={() => deletePhoto(photo.filename)}
                  className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded opacity-75 hover:opacity-100"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}