const db = require("../models");
const Treatment = db.Treatment;

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