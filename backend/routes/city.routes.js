const express = require("express");
const router = express.Router();
const cityController = require("../controllers/city.controller");
const { authJwt } = require("../middlewares");

router.get("/", cityController.getAllCities);
router.get("/:id", cityController.getCityById);
router.post("/", [authJwt.verifyToken, authJwt.isAdmin], cityController.createCity);
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], cityController.updateCity);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], cityController.deleteCity);

module.exports = router;