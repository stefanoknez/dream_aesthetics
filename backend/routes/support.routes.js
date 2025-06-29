const express = require("express");
const router = express.Router();
const supportController = require("../controllers/support.controller");
const { authJwt } = require("../middlewares");

router.post("/", supportController.sendMessage); // javna ruta za korisnike
router.get("/", [authJwt.verifyToken, authJwt.isAdmin], supportController.getMessages); // samo admin
router.put("/:id/reply", [authJwt.verifyToken, authJwt.isAdmin], supportController.replyToMessage);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], supportController.deleteMessage); 

module.exports = router;