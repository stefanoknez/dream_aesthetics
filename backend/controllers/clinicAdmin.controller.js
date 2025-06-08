const db = require("../models");
const Clinic = db.Clinic;
const AppointmentRequest = db.AppointmentRequest;
const ClinicTreatments = db.ClinicTreatments;
const Treatment = db.Treatment;
const User = db.User;

exports.getMyClinic = async (req, res) => {
  try {
    const userId = req.userId;
    const clinic = await Clinic.findOne({ where: { user_id: userId } });
    if (!clinic) return res.status(404).send({ message: "Clinic not found." });
    res.json(clinic);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateMyClinic = async (req, res) => {
  try {
    const userId = req.userId;
    const clinic = await Clinic.findOne({ where: { user_id: userId } });
    if (!clinic) return res.status(404).send({ message: "Clinic not found." });

    await Clinic.update(req.body, { where: { id: clinic.id } });
    res.send({ message: "Clinic updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const userId = req.userId;
    const clinic = await Clinic.findOne({ where: { user_id: userId } });
    if (!clinic) return res.status(404).send({ message: "Clinic not found." });

    const appointments = await AppointmentRequest.findAll({ where: { clinic_id: clinic.id } });
    res.json(appointments);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { status } = req.body;
    await AppointmentRequest.update({ status }, { where: { id: appointmentId } });
    res.send({ message: "Appointment status updated." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getMyTreatments = async (req, res) => {
  try {
    const userId = req.userId;
    const clinic = await Clinic.findOne({ where: { user_id: userId } });
    if (!clinic) return res.status(404).send({ message: "Clinic not found." });

    const treatments = await ClinicTreatments.findAll({
      where: { clinic_id: clinic.id },
      include: [{ model: Treatment, as: "Treatment" }]
    });

    const result = treatments
      .filter((ct) => ct.Treatment) 
      .map((ct) => ({
        id: ct.Treatment.id,
        name: ct.Treatment.name,
        description: ct.Treatment.description,
        applicable_for: ct.Treatment.applicable_for
      }));

    res.json(result);
  } catch (err) {
    console.error("Error fetching treatments:", err);
    res.status(500).send({ message: err.message });
  }
};

exports.addTreatmentToClinic = async (req, res) => {
  try {
    const userId = req.userId;
    const { treatment_id } = req.body;
    const clinic = await Clinic.findOne({ where: { user_id: userId } });

    if (!clinic) return res.status(404).send({ message: "Clinic not found." });

    await ClinicTreatments.create({ clinic_id: clinic.id, treatment_id });
    res.send({ message: "Treatment added to clinic." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.removeTreatmentFromClinic = async (req, res) => {
  try {
    const userId = req.userId;
    const treatmentId = req.params.id;
    const clinic = await Clinic.findOne({ where: { user_id: userId } });

    if (!clinic) return res.status(404).send({ message: "Clinic not found." });

    await ClinicTreatments.destroy({
      where: { clinic_id: clinic.id, treatment_id: treatmentId }
    });
    res.send({ message: "Treatment removed from clinic." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.findAll({
      attributes: ["id", "name"]
    });
    res.json(treatments);
  } catch (err) {
    res.status(500).send({ message: "Failed to fetch treatments." });
  }
};