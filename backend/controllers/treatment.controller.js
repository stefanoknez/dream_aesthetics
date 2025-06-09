const db = require("../models");
const Treatment = db.Treatment;
const Clinic = db.Clinic;
const ClinicTreatments = db.ClinicTreatments;

exports.getAllTreatments = async (req, res) => {
    try {
        const treatments = await Treatment.findAll();
        res.json(treatments);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getTreatmentById = async (req, res) => {
    try {
        const treatment = await Treatment.findByPk(req.params.id);
        if (!treatment) {
            return res.status(404).send({ message: "Treatment not found" });
        }
        res.json(treatment);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.createTreatment = async (req, res) => {
    try {
        const { name, description, applicable_for } = req.body;
        const newTreatment = await Treatment.create({
            name,
            description,
            applicable_for
        });
        res.status(201).json(newTreatment);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateTreatment = async (req, res) => {
    try {
        const treatment = await Treatment.findByPk(req.params.id);
        if (!treatment) {
            return res.status(404).send({ message: "Treatment not found" });
        }
        await treatment.update(req.body);
        res.json(treatment);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteTreatment = async (req, res) => {
    try {
        const treatment = await Treatment.findByPk(req.params.id);
        if (!treatment) {
            return res.status(404).send({ message: "Treatment not found" });
        }
        await treatment.destroy();
        res.send({ message: "Treatment deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getClinicsForTreatment = async (req, res) => {
  try {
    const treatmentId = req.params.id;

    const clinics = await Clinic.findAll({
      include: [{
        model: Treatment,
        as: "treatments",
        where: { id: treatmentId },
        through: { attributes: [] }, // da ne prikazuje join tabelu
      }],
    });

    res.json(clinics);
  } catch (err) {
    console.error("Error fetching clinics for treatment:", err);
    res.status(500).send({ message: "Failed to fetch clinics for this treatment." });
  }
};