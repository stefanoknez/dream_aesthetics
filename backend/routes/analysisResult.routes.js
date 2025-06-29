const express = require("express");
const router = express.Router();
const analysisResultController = require("../controllers/analysisResult.controller");
const { authJwt } = require("../middlewares");

// Public routes
router.get("/", analysisResultController.getAllResults);

// rezultati po user_id (logicko particionisanje)
router.get("/user/:userId", [authJwt.verifyToken], analysisResultController.getResultsByUserId);


router.get("/:id", analysisResultController.getResultById);

// Protected routes
router.post("/", [authJwt.verifyToken], analysisResultController.createResult);
router.delete("/:id", [authJwt.verifyToken], analysisResultController.deleteResult);

module.exports = router;