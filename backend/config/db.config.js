module.exports = {
  HOST: "localhost",
  USER: "app_user",
  PASSWORD: "strongpassword123",
  DB: "dream_aesthetics_db",
  DIALECT: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};