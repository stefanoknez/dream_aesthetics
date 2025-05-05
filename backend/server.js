const db = require("./models");

db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synced.");
})  .catch((err) => {
  console.error("Failed to sync DB:", err.message || err);
});