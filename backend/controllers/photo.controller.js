const db = require("../models");
const Photo = db.Photo;

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
        if (!photo) {
            return res.status(404).send({ message: "Photo not found" });
        }
        res.json(photo);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.uploadPhoto = async (req, res) => {
    try {
        const { filename } = req.body;
        if (!filename) {
            return res.status(400).send({ message: "Filename is required" });
        }
        const newPhoto = await Photo.create({
            user_id: req.userId,  // uzimamo ID iz tokena
            filename,
            uploaded_at: new Date()
        });
        res.status(201).json(newPhoto);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deletePhoto = async (req, res) => {
    try {
        const photo = await Photo.findByPk(req.params.id);
        if (!photo) {
            return res.status(404).send({ message: "Photo not found" });
        }
        await photo.destroy();
        res.send({ message: "Photo deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};