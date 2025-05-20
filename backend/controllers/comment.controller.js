const db = require("../models");
const Comment = db.Comment;

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.json(comments);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).send({ message: "Comment not found" });
        }
        res.json(comment);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.createComment = async (req, res) => {
    try {
        const { clinic_id, text } = req.body;
        if (!clinic_id || !text) {
            return res.status(400).send({ message: "Clinic ID and text are required" });
        }
        const newComment = await Comment.create({
            user_id: req.userId,
            clinic_id,
            text,
            created_at: new Date()
        });
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).send({ message: "Comment not found" });
        }
        if (comment.user_id !== req.userId) {
            return res.status(403).send({ message: "You can update only your own comments" });
        }
        await comment.update(req.body);
        res.json(comment);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).send({ message: "Comment not found" });
        }
        if (comment.user_id !== req.userId) {
            return res.status(403).send({ message: "You can delete only your own comments" });
        }
        await comment.destroy();
        res.send({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};