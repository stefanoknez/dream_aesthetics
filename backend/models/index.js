const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  pool: dbConfig.pool
});

const db = {};

db.ClinicTreatments = require("./clinicTreatments.model.js")(sequelize, Sequelize.DataTypes);

fs.readdirSync(__dirname)
  .filter(file => 
    file !== "index.js" &&
    file.endsWith(".model.js") &&
    file !== "clinicTreatments.model.js"
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;