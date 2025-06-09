const express = require("express");
const router = express.Router();
const treatmentController = require("../controllers/treatment.controller");
const { authJwt } = require("../middlewares");

// public routes
router.get("/", treatmentController.getAllTreatments);
router.get("/:id", treatmentController.getTreatmentById);
router.get("/:id/clinics", treatmentController.getClinicsForTreatment);

// admin-protected routes
router.post("/", [authJwt.verifyToken, authJwt.isAdmin], treatmentController.createTreatment);
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], treatmentController.updateTreatment);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], treatmentController.deleteTreatment);

module.exports = router;