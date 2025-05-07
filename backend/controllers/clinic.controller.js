const db = require("../models");
const Clinic = db.Clinic;

exports.getAllClinics = async (req, res) => {
    try {
        const clinics = await Clinic.findAll();
        res.json(clinics);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getClinicById = async (req, res) => {
    try {
        const clinic = await Clinic.findByPk(req.params.id);
        if (!clinic) return res.status(404).json({ message: "Clinic not found" });
        res.json(clinic);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createClinic = async (req, res) => {
    try {
        const clinic = await Clinic.create(req.body);
        res.status(201).json(clinic);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateClinic = async (req, res) => {
    try {
        const clinic = await Clinic.findByPk(req.params.id);
        if (!clinic) return res.status(404).json({ message: "Clinic not found" });

        await clinic.update(req.body);
        res.json(clinic);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteClinic = async (req, res) => {
    try {
        const clinic = await Clinic.findByPk(req.params.id);
        if (!clinic) return res.status(404).json({ message: "Clinic not found" });

        await clinic.destroy();
        res.json({ message: "Clinic deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};