const express = require("express");
const router = express.Router();
const appointmentRequestController = require("../controllers/appointmentRequest.controller");
const { authJwt } = require("../middlewares");

// public routes
router.get("/", appointmentRequestController.getAllAppointmentRequests);
router.get("/:id", appointmentRequestController.getAppointmentRequestById);

// user/admin-protected routes
router.post("/", [authJwt.verifyToken], appointmentRequestController.createAppointmentRequest);
router.put("/:id", [authJwt.verifyToken], appointmentRequestController.updateAppointmentRequest);
router.delete("/:id", [authJwt.verifyToken], appointmentRequestController.deleteAppointmentRequest);

module.exports = router;