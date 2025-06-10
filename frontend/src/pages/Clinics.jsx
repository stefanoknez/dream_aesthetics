import React, { useEffect, useState } from "react";
import axios from "axios";
import bg1 from "../assets/bg1.webp"; 

export default function Clinics() {
  const [clinics, setClinics] = useState([]);
  const [currentIndexes, setCurrentIndexes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState("");

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/clinics/with-photos");
        setClinics(res.data);
        const initialIndexes = {};
        res.data.forEach(c => initialIndexes[c.id] = 0);
        setCurrentIndexes(initialIndexes);
      } catch (err) {
        console.error("Failed to fetch clinics:", err);
      }
    };
    fetchClinics();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexes(prev =>
        Object.fromEntries(
          Object.entries(prev).map(([id, index]) => {
            const clinic = clinics.find(c => c.id === parseInt(id));
            const photoCount = clinic?.photos?.length || 1;
            return [id, (index + 1) % photoCount];
          })
        )
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [clinics]);

  const filteredClinics = clinics.filter(c =>
    (!searchTerm || c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.treatments.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (!selectedTreatment || c.treatments.includes(selectedTreatment))
  );

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg1})` }} 
    >
      {/* Search panel */}
      <div className="sticky top-0 z-50 px-6 pt-4 pb-2 bg-white/20 backdrop-blur-md border-b border-white/30">
        <div className="max-w-5xl mx-auto">
          <input
            type="text"
            placeholder="Quick search by name or treatment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-3 px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none"
          />
          <div className="flex flex-wrap gap-3">
            <select
              className="px-3 py-2 text-sm border border-gray-300 rounded"
              value={selectedTreatment}
              onChange={(e) => setSelectedTreatment(e.target.value)}
            >
              <option value="">Filter by treatment</option>
              {[...new Set(clinics.flatMap(c => c.treatments))].map((treat, idx) => (
                <option key={idx} value={treat}>{treat}</option>
              ))}
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedTreatment("");
              }}
              className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 border rounded"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Grid of clinics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
        {filteredClinics.map((clinic) => (
          <div
            key={clinic.id}
            className="relative group h-48 sm:h-56 md:h-60 lg:h-64 w-full overflow-hidden"
          >
            {clinic.photos?.map((photo, idx) => (
              <img
                key={idx}
                src={`http://localhost:3000/uploads/${photo.filename}`}
                alt={`${clinic.name} - ${idx}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ease-in-out ${
                  currentIndexes[clinic.id] === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-4 z-20">
              <h3 className="text-lg font-bold mb-2">{clinic.name}</h3>
              <ul className="text-sm mb-1">
                {clinic.treatments.map((treat, i) => (
                  <li key={i}>{treat}</li>
                ))}
              </ul>
              <p className="text-xs mt-1">{clinic.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}