const db = require("../models");
const AnalysisResult = db.AnalysisResult;

exports.getAllResults = async (req, res) => {
    try {
        const results = await AnalysisResult.findAll();
        res.json(results);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getResultById = async (req, res) => {
    try {
        const result = await AnalysisResult.findByPk(req.params.id);
        if (!result) {
            return res.status(404).send({ message: "AnalysisResult not found" });
        }
        res.json(result);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.createResult = async (req, res) => {
    try {
        const {
            photo_id,
            ear_distance,
            mole_count,
            acne_detected,
            wrinkle_score,
            botox_recommended,
            face_symmetry
        } = req.body;

        if (!photo_id) {
            return res.status(400).send({ message: "photo_id is required" });
        }

        const newResult = await AnalysisResult.create({
            photo_id,
            ear_distance,
            mole_count,
            acne_detected,
            wrinkle_score,
            botox_recommended,
            face_symmetry,
            generated_at: new Date()
        });

        res.status(201).json(newResult);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteResult = async (req, res) => {
    try {
        const result = await AnalysisResult.findByPk(req.params.id);
        if (!result) {
            return res.status(404).send({ message: "AnalysisResult not found" });
        }
        await result.destroy();
        res.send({ message: "AnalysisResult deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};