// backend/app.js
const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
const db = require("./models");
db.sequelize.sync();

// Routes
require("./routes/auth.routes")(app);
require("./routes/photo.routes")(app);
require("./routes/recommendation.routes")(app);
require("./routes/clinic.routes")(app);
require("./routes/treatment.routes")(app);
require("./routes/user.routes")(app);
require("./routes/appointment.routes")(app);

module.exports = app;