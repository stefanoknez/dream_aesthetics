import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [clinicsMap, setClinicsMap] = useState({});
  const [availableTimes, setAvailableTimes] = useState({});
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedTime, setSelectedTime] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editDate, setEditDate] = useState(null);
  const [editTimes, setEditTimes] = useState([]);
  const [editTime, setEditTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setSummary(null);
    setRecommendations([]);
    setShowRecommendations(false);
    setClinicsMap({});
    setAvailableTimes({});
    setSelectedDate({});
    setSelectedTime({});
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 4000));

      const token = user?.accessToken;
      const response = await axios.post("http://localhost:3000/api/photos/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSummary(response.data.summary);
      await fetchRecommendations();
    } catch (error) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const token = user?.accessToken;
      const res = await axios.get("http://localhost:3000/api/recommendations", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const uniqueMap = new Map();
      res.data.forEach((r) => {
        if (!uniqueMap.has(r.treatment_id)) uniqueMap.set(r.treatment_id, r);
      });

      const uniqueRecs = Array.from(uniqueMap.values());
      setRecommendations(uniqueRecs);
      setShowRecommendations(true);

      const clinicsObj = {};
      for (const rec of uniqueRecs) {
        const resp = await axios.get(`http://localhost:3000/api/treatments/${rec.treatment_id}/clinics`);
        clinicsObj[rec.treatment_id] = resp.data;
      }
      setClinicsMap(clinicsObj);
    } catch (err) {
      alert("Could not load recommendations");
    }
  };

  const handleDateChange = async (clinicId, date) => {
    setSelectedDate((prev) => ({ ...prev, [clinicId]: date }));
    try {
      const res = await axios.get(`http://localhost:3000/api/appointments/available/${clinicId}`);
      const timesForDate = res.data.filter((t) => {
        const tDate = new Date(t);
        return tDate.toDateString() === new Date(date).toDateString();
      });
      setAvailableTimes((prev) => ({ ...prev, [clinicId]: timesForDate }));
    } catch (err) {
      alert("Failed to fetch available times.");
    }
  };

  const handleAppointment = async (clinicId) => {
    const time = selectedTime[clinicId];
    if (!time) return alert("Please select a time.");

    try {
      await axios.post("http://localhost:3000/api/appointments", {
        user_id: user.id,
        clinic_id: clinicId,
        datetime: time,
        status: "PENDING",
      }, {
        headers: { Authorization: `Bearer ${user.accessToken}` }
      });

      alert("Appointment request sent.");
      fetchMyAppointments();
    } catch (err) {
      alert("Failed to send appointment request.");
    }
  };

  const fetchMyAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/appointments/my", {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      setAppointments(res.data);
    } catch (err) {
      alert("Failed to load your appointments.");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      fetchMyAppointments();
    } catch (err) {
      alert("Failed to cancel appointment.");
    }
  };

  const handleEdit = async (appointment) => {
    setEditMode(appointment.id);
    setEditDate(new Date(appointment.datetime));
    const res = await axios.get(`http://localhost:3000/api/appointments/available/${appointment.clinic_id}`);
    setEditTimes(res.data.filter(t => new Date(t).toDateString() === new Date(appointment.datetime).toDateString()));
  };

  const handleEditDateChange = async (date, clinicId) => {
    setEditDate(date);
    const res = await axios.get(`http://localhost:3000/api/appointments/available/${clinicId}`);
    const filtered = res.data.filter(t => new Date(t).toDateString() === new Date(date).toDateString());
    setEditTimes(filtered);
  };

  const handleSaveEdit = async (appointment) => {
    try {
      await axios.put(`http://localhost:3000/api/appointments/${appointment.id}`, {
        datetime: editTime,
      }, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      setEditMode(null);
      fetchMyAppointments();
    } catch (err) {
      alert("Failed to update appointment.");
    }
  };

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Upload a Photo for Analysis</h1>

        <div className="flex items-center mb-4 gap-4">
          <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer inline-block">
            Select File
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
          {selectedFile && <span className="text-sm text-gray-700">{selectedFile.name}</span>}
        </div>

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Upload and Analyze"}
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
          </div>
        )}

        {showRecommendations && recommendations.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Recommended Treatments</h2>
            <ul className="space-y-4">
              {recommendations.map((rec) => (
                <li key={rec.treatment_id} className="border rounded p-4 bg-gray-50">
                  <p className="font-bold text-lg mb-1">{rec.Treatment.name}</p>
                  <p className="text-sm mb-2">{rec.Treatment.description}</p>

                  <h4 className="font-medium text-sm mt-2">Clinics offering this treatment:</h4>
                  {clinicsMap[rec.treatment_id]?.map((clinic) => (
                    <div key={clinic.id} className="pl-4 mt-2 mb-2 border-l-2 border-gray-300">
                      <p className="text-sm">{clinic.name}</p>
                      <DatePicker
                        selected={selectedDate[clinic.id] || null}
                        onChange={(date) => handleDateChange(clinic.id, date)}
                        placeholderText="Choose a date"
                        className="mt-2 border p-1 text-sm"
                      />
                      {availableTimes[clinic.id] && (
                        <>
                          <select
                            className="mt-2 border px-2 py-1 text-sm"
                            onChange={(e) =>
                              setSelectedTime((prev) => ({
                                ...prev,
                                [clinic.id]: e.target.value,
                              }))
                            }
                          >
                            <option value="">-- Select Time --</option>
                            {availableTimes[clinic.id].map((t, i) => (
                              <option key={i} value={t}>
                                {new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </option>
                            ))}
                          </select>
                          <button
                            className="ml-2 bg-indigo-600 text-white px-3 py-1 rounded text-sm"
                            onClick={() => handleAppointment(clinic.id)}
                          >
                            Book
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        )}

        {appointments.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4">My Appointments</h2>
            <ul className="space-y-3">
              {appointments.map((a) => (
                <li key={a.id} className="p-3 border rounded bg-gray-50">
                  <p><strong>Clinic:</strong> {a.Clinic?.name || a.clinic_id}</p>
                  <p><strong>Date:</strong> {new Date(a.datetime).toLocaleString()}</p>
                  <p><strong>Status:</strong> {a.status.toUpperCase()}</p>
                  {editMode === a.id ? (
                    <div className="mt-2">
                      <DatePicker
                        selected={editDate}
                        minDate={today}
                        onChange={(date) => handleEditDateChange(date, a.clinic_id)}
                        className="border p-1 text-sm"
                      />
                      <select
                        className="mt-2 border px-2 py-1 text-sm"
                        onChange={(e) => setEditTime(e.target.value)}
                      >
                        <option value="">-- Select Time --</option>
                        {editTimes.map((t, i) => (
                          <option key={i} value={t}>
                            {new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </option>
                        ))}
                      </select>
                      <button onClick={() => handleSaveEdit(a)} className="ml-2 text-sm text-blue-600">Save</button>
                      <button onClick={() => setEditMode(null)} className="ml-2 text-sm text-gray-600">Cancel</button>
                    </div>
                  ) : (
                    <div className="mt-2 flex gap-4">
                      {a.status.toUpperCase() === "PENDING" ? (
                        <>
                          <button onClick={() => handleEdit(a)} className="text-blue-600 text-sm">Edit</button>
                          <button onClick={() => handleCancel(a.id)} className="text-red-600 text-sm">Cancel</button>
                        </>
                      ) : (
                        <button onClick={() => handleCancel(a.id)} className="text-red-600 text-sm">Delete</button>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}