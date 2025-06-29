const db = require("../models");
const SupportMessage = db.SupportMessage;

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const saved = await SupportMessage.create({ name, email, message });
    res.status(201).json(saved);
  } catch (err) {
    console.error("Support error:", err); 
    res.status(500).json({ message: "Failed to send support message." });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await SupportMessage.findAll({ order: [["created_at", "DESC"]] });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch support messages." });
  }
};

exports.replyToMessage = async (req, res) => {
  try {
    const { reply } = req.body;
    const id = req.params.id;
    const message = await SupportMessage.findByPk(id);
    if (!message) return res.status(404).json({ message: "Not found" });

    message.reply = reply;
    await message.save();
    res.json({ message: "Reply sent." });
  } catch (err) {
    res.status(500).json({ message: "Failed to send reply." });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const id = req.params.id;
    const message = await SupportMessage.findByPk(id);
    if (!message) return res.status(404).json({ message: "Message not found" });

    await message.destroy();
    res.json({ message: "Message deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete message." });
  }
};