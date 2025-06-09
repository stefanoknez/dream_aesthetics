const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const upload = require("../middlewares/upload.middleware");
const { authJwt } = require("../middlewares");
const db = require("../models");
const Clinic = db.Clinic;
const Photo = db.Photo;

const uploadDir = path.join(__dirname, "..", "uploads");


// CLINIC ADMIN ROUTES

router.post(
  "/upload",
  [authJwt.verifyToken, authJwt.isClinicAdmin, upload.single("file")],
  async (req, res) => {
    try {
      const userId = req.userId;
      console.log("Upload request by user:", userId);
      console.log("Uploaded file:", req.file);

      if (!req.file) {
        return res.status(400).send({ message: "No file uploaded" });
      }

      const clinic = await Clinic.findOne({ where: { user_id: userId } });
      if (!clinic) {
        console.log("No clinic found for user:", userId);
        return res.status(404).send({ message: "Clinic not found" });
      }

      await Photo.create({
        clinic_id: clinic.id,
        filename: req.file.filename,
        uploaded_at: new Date(),
      });

      res.status(200).send({ message: "File uploaded successfully" });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).send({ message: err.message });
    }
  }
);

router.get(
  "/",
  [authJwt.verifyToken, authJwt.isClinicAdmin],
  async (req, res) => {
    try {
      const userId = req.userId;
      console.log("Fetching photos for user:", userId);

      const clinic = await Clinic.findOne({ where: { user_id: userId } });
      if (!clinic)
        return res.status(404).send({ message: "Clinic not found" });

      const photos = await Photo.findAll({
        where: { clinic_id: clinic.id },
        order: [["uploaded_at", "DESC"]],
      });

      res.send(photos);
    } catch (err) {
      console.error("Fetch photos error:", err);
      res.status(500).send({ message: err.message });
    }
  }
);

router.delete(
  "/:filename",
  [authJwt.verifyToken, authJwt.isClinicAdmin],
  async (req, res) => {
    try {
      const filename = req.params.filename;
      const filePath = path.join(uploadDir, filename);
      console.log("Deleting file:", filename);

      fs.unlinkSync(filePath);
      await Photo.destroy({ where: { filename } });

      res.send({ message: "File deleted successfully" });
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).send({ message: "Failed to delete file" });
    }
  }
);

// ADMIN ROUTES

router.get(
  "/all",
  [authJwt.verifyToken, authJwt.isAdmin],
  (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
      if (err) {
        console.error("Admin read error:", err);
        return res.status(500).send({ message: "Failed to read files." });
      }
      res.send(files);
    });
  }
);

router.delete(
  "/admin/:filename",
  [authJwt.verifyToken, authJwt.isAdmin],
  async (req, res) => {
    try {
      const filename = req.params.filename;
      const filePath = path.join(uploadDir, filename);
      console.log("Admin deleting file:", filename);

      fs.unlinkSync(filePath);
      await Photo.destroy({ where: { filename } });

      res.send({ message: "File deleted by admin." });
    } catch (err) {
      console.error("Admin delete error:", err);
      res.status(500).send({ message: "Failed to delete file." });
    }
  }
);

module.exports = router;