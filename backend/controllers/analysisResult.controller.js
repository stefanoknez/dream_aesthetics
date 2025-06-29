// controllers/analysisResult.controller.js

const db = require("../models");
const AnalysisResult = db.AnalysisResult;
const Photo = db.Photo;

// GET /api/analysis-results
exports.getAllResults = async (req, res) => {
  try {
    const results = await AnalysisResult.findAll();
    res.json(results);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// GET /api/analysis-results/:id
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

// POST /api/analysis-results
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

// DELETE /api/analysis-results/:id
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

// GET /api/analysis-results/user/:userId
exports.getResultsByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    const results = await AnalysisResult.findAll({
      include: [
        {
          model: Photo,
          where: { user_id: userId }
        }
      ]
    });

    res.json(results);
  } catch (err) {
    console.error("getResultsByUserId error:", err);
    res.status(500).send({ message: err.message });
  }
};