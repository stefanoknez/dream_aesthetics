const db = require("../models");
const Recommendation = db.Recommendation;
const Treatment = db.Treatment;

exports.getAllRecommendations = async (req, res) => {
    try {
        const recommendations = await Recommendation.findAll({
            include: [{
                model: Treatment,
                attributes: ["name", "description"]
            }]
        });
        res.json(recommendations);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getRecommendationById = async (req, res) => {
    try {
        const recommendation = await Recommendation.findByPk(req.params.id, {
            include: [{
                model: Treatment,
                attributes: ["name", "description"]
            }]
        });
        if (!recommendation) {
            return res.status(404).send({ message: "Recommendation not found" });
        }
        res.json(recommendation);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.createRecommendation = async (req, res) => {
    try {
        const { analysis_result_id, treatment_id, relevance_score, notes } = req.body;
        const newRecommendation = await Recommendation.create({
            analysis_result_id,
            treatment_id,
            relevance_score,
            notes
        });
        res.status(201).json(newRecommendation);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateRecommendation = async (req, res) => {
    try {
        const recommendation = await Recommendation.findByPk(req.params.id);
        if (!recommendation) {
            return res.status(404).send({ message: "Recommendation not found" });
        }
        await recommendation.update(req.body);
        res.json(recommendation);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteRecommendation = async (req, res) => {
    try {
        const recommendation = await Recommendation.findByPk(req.params.id);
        if (!recommendation) {
            return res.status(404).send({ message: "Recommendation not found" });
        }
        await recommendation.destroy();
        res.send({ message: "Recommendation deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};