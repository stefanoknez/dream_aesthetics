const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photo.controller");
const { authJwt } = require("../middlewares");

// public routes
router.get("/", photoController.getAllPhotos);
router.get("/:id", photoController.getPhotoById);

// user-protected routes (samo ulogovani moze da vrsi upload))
router.post("/", [authJwt.verifyToken], photoController.uploadPhoto);
router.delete("/:id", [authJwt.verifyToken], photoController.deletePhoto);

module.exports = router;