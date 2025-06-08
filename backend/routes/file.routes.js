const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { authJwt } = require("../middlewares");

const uploadDir = path.join(__dirname, "..", "uploads");

// GET /api/files
router.get("/", [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).send({ message: "Failed to read files." });
    res.send(files);
  });
});

// DELETE /api/files/:filename
router.delete("/:filename", [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDir, filename);

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send({ message: "Failed to delete file." });
    res.send({ message: "File deleted successfully." });
  });
});

module.exports = router;