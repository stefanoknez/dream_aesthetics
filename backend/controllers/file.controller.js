const fs = require("fs");
const path = require("path");

const UPLOAD_DIR = path.join(__dirname, "../uploads");

exports.listFiles = (req, res) => {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) return res.status(500).send({ message: "Failed to list files" });
    res.json(files);
  });
};

exports.deleteFile = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(UPLOAD_DIR, filename);

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send({ message: "Failed to delete file" });
    res.send({ message: "File deleted successfully" });
  });
};