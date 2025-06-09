const express = require("express");
const router = express.Router();
const clinicAdminController = require("../controllers/clinicAdmin.controller");
const { authJwt } = require("../middlewares");

router.get("/my-clinic", [authJwt.verifyToken, authJwt.isClinicAdmin], clinicAdminController.getMyClinic);
router.put("/my-clinic", [authJwt.verifyToken, authJwt.isClinicAdmin], clinicAdminController.updateMyClinic);

router.get("/appointments", [authJwt.verifyToken, authJwt.isClinicAdmin], clinicAdminController.getAppointments);

router.put("/appointments/:id", [authJwt.verifyToken, authJwt.isClinicAdmin], clinicAdminController.updateAppointmentStatus);

router.get("/treatments", [authJwt.verifyToken, authJwt.isClinicAdmin], clinicAdminController.getMyTreatments);
router.post("/treatments", [authJwt.verifyToken, authJwt.isClinicAdmin], clinicAdminController.addTreatmentToClinic);
router.delete("/treatments/:id", [authJwt.verifyToken, authJwt.isClinicAdmin], clinicAdminController.removeTreatmentFromClinic);
router.get("/all-treatments", [authJwt.verifyToken, authJwt.isClinicAdmin], clinicAdminController.getAllTreatments);

module.exports = router;