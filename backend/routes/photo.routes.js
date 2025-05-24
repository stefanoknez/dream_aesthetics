const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photo.controller");
const { authJwt } = require("../middlewares");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

router.get("/", photoController.getAllPhotos);
router.get("/:id", photoController.getPhotoById);
router.post("/", [authJwt.verifyToken], photoController.uploadPhoto);
router.post("/upload", [authJwt.verifyToken, upload.single("photo")], photoController.uploadPhotoFile);
router.post("/analyze", [authJwt.verifyToken, upload.single("photo")], photoController.analyzePhoto);
router.delete("/:id", [authJwt.verifyToken], photoController.deletePhoto);

module.exports = router;