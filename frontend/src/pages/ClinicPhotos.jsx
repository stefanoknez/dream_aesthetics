import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ClinicPhotos() {
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  const fetchPhotos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/files", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(res.data);
    } catch (err) {
      alert("Failed to load files");
    }
  };

  const handleUpload = async () => {
    if (!selected) return;
    const formData = new FormData();
    formData.append("file", selected);
    try {
      await axios.post("http://localhost:3000/api/files/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSelected(null);
      fetchPhotos();
    } catch (err) {
      alert("Upload failed");
    }
  };

  const deleteFile = async (name) => {
    try {
      await axios.delete(`http://localhost:3000/api/files/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPhotos();
    } catch (err) {
      alert("Failed to delete file");
    }
  };
}