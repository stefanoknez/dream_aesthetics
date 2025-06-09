const express = require("express");
const router = express.Router();
const appointmentRequestController = require("../controllers/appointmentRequest.controller");
const { authJwt } = require("../middlewares");

router.get("/available/:id", appointmentRequestController.getAvailableTimes);

// protected routes
router.get("/", [authJwt.verifyToken], appointmentRequestController.getAllAppointmentRequests);
router.get("/my", [authJwt.verifyToken], appointmentRequestController.getMyAppointments);
router.get("/:id", [authJwt.verifyToken], appointmentRequestController.getAppointmentRequestById);
router.post("/", [authJwt.verifyToken], appointmentRequestController.createAppointmentRequest);
router.put("/:id", [authJwt.verifyToken], appointmentRequestController.updateAppointmentRequest);
router.delete("/:id", [authJwt.verifyToken], appointmentRequestController.deleteAppointmentRequest);

module.exports = router;