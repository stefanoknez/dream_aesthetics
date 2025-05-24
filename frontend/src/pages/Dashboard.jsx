import React, { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setSummary(null);
    setRecommendations([]);
    setShowRecommendations(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.accessToken;

      const response = await axios.post("http://localhost:3000/api/photos/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error during upload:", error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.accessToken;

      const res = await axios.get("http://localhost:3000/api/recommendations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecommendations(res.data);
      setShowRecommendations(true);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      alert("Could not load recommendations");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Upload a Photo for Analysis</h1>

        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload and Analyze"}
        </button>

        {summary && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Analysis Summary</h2>
            <ul className="list-disc ml-5">
              <li>Acne Detected: {summary.acne ? "Yes" : "No"}</li>
              <li>Mole Count: {summary.moles}</li>
              <li>Golden Ratio: {summary.golden_ratio ?? "N/A"}</li>
              <li>Botox Recommended: {summary.botox ? "Yes" : "No"}</li>
            </ul>

            <button
              onClick={fetchRecommendations}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              View Recommendations
            </button>
          </div>
        )}

        {showRecommendations && recommendations.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Recommended Treatments</h2>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded border">
                  <p className="font-medium">Treatment: {rec.Treatment?.name ?? `#${rec.treatment_id}`}</p>
                  <p>{rec.Treatment?.description || "No description provided."}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}