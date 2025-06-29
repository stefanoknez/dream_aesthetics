const db = require("../models");
const Comment = db.Comment;
const User = db.User;

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username"]
        }
      ],
      order: [["created_at", "DESC"]]
    });
    res.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { text, platform_rating } = req.body;

    if (!text || !platform_rating) {
      return res.status(400).json({ message: "Text and platform rating are required." });
    }

    const newComment = await Comment.create({
      user_id: req.userId,
      text,
      platform_rating,
      created_at: new Date()
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ message: "Error creating comment" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ message: "Error deleting comment" });
  }
};

exports.bulkDelete = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid or empty ID list" });
    }

    const deleted = await Comment.destroy({
      where: { id: ids }
    });

    res.json({ message: `Bulk delete successful (${deleted} deleted)` });
  } catch (err) {
    console.error("Error bulk deleting comments:", err);
    res.status(500).json({ message: "Bulk delete failed" });
  }
};