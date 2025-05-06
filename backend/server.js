const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./models");
const authRoutes = require("./routes/auth.routes");

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Dream Aesthetics API." });
});

authRoutes(app);

db.sequelize.sync({ force: false }).then(() => {
    console.log("Database synced.");
}).catch((err) => {
    console.error("Failed to sync DB:", err.message || err);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});