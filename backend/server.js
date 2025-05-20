const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./models");
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

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Dream Aesthetics API." });
});

// Routes
authRoutes(app);
app.use("/api/clinics", clinicRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/appointments", appointmentRequestRoutes); 
app.use("/api/photos", photoRoutes);
app.use("/api/analysis-results", analysisResultRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/treatments", treatmentRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/logs", logRoutes);

db.sequelize.sync({ force: false }).then(() => {
    console.log("Database synced.");
}).catch((err) => {
    console.error("Failed to sync DB:", err.message || err);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});