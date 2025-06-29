const express = require("express");
const cors = require("cors");
const path = require("path");
const os = require("os");

const app = express();

// CORS opcije — koristi lokalni frontend
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Statika (slike, fajlovi)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Welcome ruta
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Dream Aesthetics API." });
});

// Ruta za prikaz hostname-a backend pod-a (korisno za Kubernetes load balancing test)
app.get("/hostname", (req, res) => {
  res.send(`Served by pod: ${os.hostname()}`);
});

// DB konekcija
const db = require("./models");

db.sequelize.sync({ force: false })
  .then(() => console.log("✅ Database synced."))
  .catch((err) => console.error("❌ Failed to sync DB:", err.message || err));

// API rute
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
app.use("/api/clinics", require("./routes/clinic.routes"));
app.use("/api/cities", require("./routes/city.routes"));
app.use("/api/appointments", require("./routes/appointmentRequest.routes"));
app.use("/api/photos", require("./routes/photo.routes"));
app.use("/api/analysis-results", require("./routes/analysisResult.routes"));
app.use("/api/recommendations", require("./routes/recommendation.routes"));
app.use("/api/treatments", require("./routes/treatment.routes"));
app.use("/api/comments", require("./routes/comment.routes"));
app.use("/api/logs", require("./routes/log.routes"));
app.use("/api/search", require("./routes/search.routes"));
app.use("/api/files", require("./routes/file.routes"));
app.use("/api/clinic-admin", require("./routes/clinicAdmin.routes"));
app.use("/api/support", require("./routes/support.routes"));

// Pokretanje servera
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});