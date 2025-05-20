const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const { authJwt } = require("../middlewares");

// public routes
router.get("/", commentController.getAllComments);
router.get("/:id", commentController.getCommentById);

// user-protected routes
router.post("/", [authJwt.verifyToken], commentController.createComment);
router.put("/:id", [authJwt.verifyToken], commentController.updateComment);
router.delete("/:id", [authJwt.verifyToken], commentController.deleteComment);

module.exports = router;