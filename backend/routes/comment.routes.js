const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const { authJwt } = require("../middlewares");

router.get("/", commentController.getAllComments);
router.post("/", [authJwt.verifyToken], commentController.createComment);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], commentController.deleteComment);
router.post("/bulk-delete", [authJwt.verifyToken, authJwt.isAdmin], commentController.bulkDelete);

module.exports = router;