const db = require("../models");
const Photo = db.Photo;
const AnalysisResult = db.AnalysisResult;
const Recommendation = db.Recommendation;
const Log = db.Log;
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

exports.getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.findAll();
    res.json(photos);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getPhotoById = async (req, res) => {
  try {
    const photo = await Photo.findByPk(req.params.id);
    if (!photo) return res.status(404).send({ message: "Photo not found" });
    res.json(photo);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.uploadPhoto = async (req, res) => {
  try {
    const { filename, clinic_id } = req.body;
    if (!filename) return res.status(400).send({ message: "Filename is required" });

    const newPhoto = await Photo.create({
      user_id: req.userId,
      clinic_id: clinic_id || null,
      filename,
      uploaded_at: new Date()
    });

    await Log.create({
      user_id: req.userId,
      action: "Upload Photo",
      description: `User uploaded photo '${filename}'`,
      timestamp: new Date()
    });

    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.uploadPhotoFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send({ message: "No file uploaded." });

    const { clinic_id } = req.body;

    const newPhoto = await Photo.create({
      user_id: req.userId,
      clinic_id: clinic_id || null,
      filename: req.file.filename,
      uploaded_at: new Date()
    });

    await Log.create({
      user_id: req.userId,
      action: "Upload Photo",
      description: `User uploaded file '${req.file.filename}'`,
      timestamp: new Date()
    });

    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.analyzePhoto = async (req, res) => {
  try {
    if (!req.file) {
      console.error("[UPLOAD ERROR] No file was received.");
      return res.status(400).send({ message: "No file uploaded." });
    }

    const userId = req.userId;
    const filePath = req.file.path;
    const fileName = req.file.filename;

    console.log(`[UPLOAD] File received: ${fileName} at path ${filePath}`);

    const existingPhoto = await Photo.findOne({
      where: {
        user_id: userId,
        filename: fileName
      }
    });
    if (existingPhoto) {
      console.log(`[CLEANUP] Found existing photo with same filename, deleting...`);
      await existingPhoto.destroy();
    }

    const newPhoto = await Photo.create({
      user_id: userId,
      filename: fileName,
      uploaded_at: new Date()
    });

    const formData = new FormData();
    formData.append("image", fs.createReadStream(filePath));

    console.log("[AI SERVICE] Sending image to AI service...");
    const aiServiceUrl = process.env.AI_SERVICE_URL || "http://ai_service:8000";

    const aiResponse = await axios.post(`${aiServiceUrl}/analyze-face`, formData, {
      headers: formData.getHeaders(),
      maxBodyLength: Infinity // za velike slike
    });

    const data = aiResponse.data;
    console.log("[AI RESPONSE]", data);

    const photoId = newPhoto.id;

    const results = [
      { type: "mole_count", value: data.mole_count },
      { type: "golden_ratio", value: data.golden_ratio ?? "null" },
      { type: "acne_detected", value: data.acne_detected },
      { type: "botox_recommended", value: data.botox_recommended }
    ];

    for (const result of results) {
      await AnalysisResult.create({
        photo_id: photoId,
        type: result.type,
        value: String(result.value),
        createdAt: new Date()
      });
    }

    const recommendationLogic = [
      {
        condition: data.mole_count > 10,
        treatment_id: 2,
        message: "High number of moles detected. Consider dermatological consultation."
      },
      {
        condition: data.acne_detected === true,
        treatment_id: 3,
        message: "Acne signs detected. Skincare treatments recommended."
      },
      {
        condition: data.botox_recommended === true,
        treatment_id: 4,
        message: "Botox treatment may be beneficial based on detected facial features."
      }
    ];

    for (const item of recommendationLogic) {
      if (item.condition) {
        const exists = await Recommendation.findOne({
          where: { treatment_id: item.treatment_id, analysis_result_id: null }
        });
        if (!exists) {
          await Recommendation.create({
            analysis_result_id: null,
            treatment_id: item.treatment_id,
            message: item.message
          });
        }
      }
    }

    await Log.create({
      user_id: userId,
      action: "Analyze Photo",
      description: `User analyzed photo '${fileName}'.`,
      timestamp: new Date()
    });

    return res.status(200).json({
      summary: {
        acne: data.acne_detected,
        moles: data.mole_count,
        botox: data.botox_recommended,
        golden_ratio: data.golden_ratio
      },
      message: "Analysis completed successfully."
    });
  } catch (err) {
    console.error("[ANALYZE ERROR]", err.message);
    console.error(err.stack);
    return res.status(500).send({
      message: "Error analyzing photo",
      error: err.message,
      stack: err.stack
    });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findByPk(req.params.id);
    if (!photo) return res.status(404).send({ message: "Photo not found" });
    await photo.destroy();
    res.send({ message: "Photo deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};