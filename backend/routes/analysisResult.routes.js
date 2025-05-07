const express = require("express");
const router = express.Router();
const analysisResultController = require("../controllers/analysisResult.controller");
const { authJwt } = require("../middlewares");

// public routes
router.get("/", analysisResultController.getAllResults);
router.get("/:id", analysisResultController.getResultById);

// user-protected routes (ulogovani korisnik moze da doda rezultat)
router.post("/", [authJwt.verifyToken], analysisResultController.createResult);
router.delete("/:id", [authJwt.verifyToken], analysisResultController.deleteResult);

module.exports = router;