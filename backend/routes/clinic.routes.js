const express = require("express");
const router = express.Router();
const clinicController = require("../controllers/clinic.controller");
const { authJwt } = require("../middlewares");

// PUBLIC ROUTES
router.get("/with-photos", clinicController.getClinicsWithPromoImages); 
router.get("/", clinicController.getAllClinics);
router.get("/:id", clinicController.getClinicById); 

// ADMIN-PROTECTED ROUTES
router.post("/", [authJwt.verifyToken, authJwt.isAdmin], clinicController.createClinic);
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], clinicController.updateClinic);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], clinicController.deleteClinic);

module.exports = router;