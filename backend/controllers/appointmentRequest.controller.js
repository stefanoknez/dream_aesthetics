const db = require("../models");
const AppointmentRequest = db.AppointmentRequest;

exports.getAllAppointmentRequests = async (req, res) => { 
    try {
        const appointments = await AppointmentRequest.findAll();
        res.json(appointments);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAppointmentRequestById = async (req, res) => {
    try {
        const appointment = await AppointmentRequest.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).send({ message: "Appointment request not found" });
        }
        res.json(appointment);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.createAppointmentRequest = async (req, res) => {
    try {
      const { user_id, clinic_id, datetime, status } = req.body;
      const newAppointment = await AppointmentRequest.create({ user_id, clinic_id, datetime, status });
  
      await db.Log.create({
        user_id: req.userId,
        action: "Create Appointment",
        description: `User created an appointment with clinic ID ${clinic_id}.`,
        timestamp: new Date()
      });
  
      res.status(201).json(newAppointment);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

exports.updateAppointmentRequest = async (req, res) => {
    try {
        const appointment = await AppointmentRequest.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).send({ message: "Appointment request not found" });
        }
        await appointment.update(req.body);
        res.json(appointment);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteAppointmentRequest = async (req, res) => {
    try {
        const appointment = await AppointmentRequest.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).send({ message: "Appointment request not found" });
        }
        await appointment.destroy();
        res.send({ message: "Appointment request deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};