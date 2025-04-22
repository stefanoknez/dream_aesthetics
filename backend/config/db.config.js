module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "dream_aesthetics_db",
    DIALECT: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };