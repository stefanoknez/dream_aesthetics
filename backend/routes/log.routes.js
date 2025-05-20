const express = require("express");
const router = express.Router();
const logController = require("../controllers/log.controller");
const { authJwt } = require("../middlewares");

router.get("/", [authJwt.verifyToken, authJwt.isAdmin], logController.getAllLogs);
router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], logController.getLogById);
router.post("/", [authJwt.verifyToken], logController.createLog);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], logController.deleteLog);

module.exports = router;