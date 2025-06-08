const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Dream Aesthetics API." });
});

const db = require("./models");

db.sequelize.sync({ force: false })
  .then(() => {
    console.log("Database synced.");
  })
  .catch((err) => {
    console.error("Failed to sync DB:", err.message || err);
  });

const authRoutes = require("./routes/auth.routes");
const clinicRoutes = require("./routes/clinic.routes");
const cityRoutes = require("./routes/city.routes");
const appointmentRequestRoutes = require("./routes/appointmentRequest.routes");
const photoRoutes = require("./routes/photo.routes");
const analysisResultRoutes = require("./routes/analysisResult.routes");
const recommendationRoutes = require("./routes/recommendation.routes");
const treatmentRoutes = require("./routes/treatment.routes");
const commentRoutes = require("./routes/comment.routes");
const logRoutes = require("./routes/log.routes");
const searchRoutes = require("./routes/search.routes");
const userRoutes = require("./routes/user.routes");
const fileRoutes = require("./routes/file.routes");
const clinicAdminRoutes = require("./routes/clinicAdmin.routes");

authRoutes(app);
userRoutes(app);

app.use("/api/clinics", clinicRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/appointments", appointmentRequestRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/analysis-results", analysisResultRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/treatments", treatmentRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/clinic-admin", clinicAdminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});