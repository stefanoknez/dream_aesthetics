const express = require("express");
const router = express.Router();
const searchController = require("../controllers/search.controller");
const { authJwt } = require("../middlewares");

router.get("/clinics", searchController.searchClinics);
router.get("/appointments", [authJwt.verifyToken], searchController.searchAppointmentsByDate);
router.get("/users", [authJwt.verifyToken, authJwt.isAdmin], searchController.searchUsersByRole);
router.get("/cities", searchController.searchCities);

module.exports = router;