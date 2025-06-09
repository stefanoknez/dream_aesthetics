const db = require("../models");
const AppointmentRequest = db.AppointmentRequest;
const Clinic = db.Clinic;
const User = db.User;

exports.getAllAppointmentRequests = async (req, res) => {
  try {
    const clinic = await Clinic.findOne({ where: { user_id: req.userId } });
    if (!clinic) return res.status(404).send({ message: "Clinic not found" });

    const appointments = await AppointmentRequest.findAll({
      where: { clinic_id: clinic.id },
      include: [{ model: User, as: 'User', attributes: ["username"] }]
    });

    res.json(appointments);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAppointmentRequestById = async (req, res) => {
  try {
    const appointment = await AppointmentRequest.findByPk(req.params.id);
    if (!appointment) return res.status(404).send({ message: "Appointment request not found" });
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
    if (!appointment) return res.status(404).send({ message: "Appointment request not found" });
    await appointment.update(req.body);
    res.json(appointment);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await AppointmentRequest.findByPk(req.params.id);
    if (!appointment) return res.status(404).send({ message: "Appointment not found" });
    appointment.status = status;
    await appointment.save();
    res.send({ message: "Status updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteAppointmentRequest = async (req, res) => {
  try {
    const appointment = await AppointmentRequest.findByPk(req.params.id);
    if (!appointment) return res.status(404).send({ message: "Appointment request not found" });
    await appointment.destroy();
    res.send({ message: "Appointment request deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const generateTimes = () => {
  const times = [];
  const now = new Date();

  for (let d = 0; d < 30; d++) { 
    for (let h = 8; h <= 16; h++) { 
      const date = new Date(now);
      date.setDate(now.getDate() + d);
      date.setHours(h, 0, 0, 0);
      times.push(date.toISOString());
    }
  }

  return times;
};

exports.getAvailableTimes = async (req, res) => {
  try {
    const clinicId = req.params.id;
    const allTimes = generateTimes();

    const takenAppointments = await AppointmentRequest.findAll({
      where: { clinic_id: clinicId },
      attributes: ['datetime'],
    });

    const takenTimes = takenAppointments.map(a => new Date(a.datetime).toISOString());
    const available = allTimes.filter(t => !takenTimes.includes(t));
    res.json(available);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentRequest.findAll({
      where: { user_id: req.userId },
      include: [{ model: Clinic, as: 'Clinic', attributes: ["name"] }],
      order: [["datetime", "DESC"]],
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};