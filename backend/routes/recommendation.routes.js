const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendation.controller");
const { authJwt } = require("../middlewares");

// public routes
router.get("/", recommendationController.getAllRecommendations);
router.get("/:id", recommendationController.getRecommendationById);

// admin-protected routes (mzd budem mijenjao posle)
router.post("/", [authJwt.verifyToken, authJwt.isAdmin], recommendationController.createRecommendation);
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], recommendationController.updateRecommendation);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], recommendationController.deleteRecommendation);

module.exports = router;