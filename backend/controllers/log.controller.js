const db = require("../models");
const Log = db.Log;

exports.getAllLogs = async (req, res) => {
    try {
        const logs = await Log.findAll();
        res.json(logs);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getLogById = async (req, res) => {
    try {
        const log = await Log.findByPk(req.params.id);
        if (!log) {
            return res.status(404).send({ message: "Log not found" });
        }
        res.json(log);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.createLog = async (req, res) => {
    try {
        const { action, description } = req.body;
        const newLog = await Log.create({
            user_id: req.userId, // iz tokena
            action,
            description,
            timestamp: new Date()
        });
        res.status(201).json(newLog);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteLog = async (req, res) => {
    try {
        const log = await Log.findByPk(req.params.id);
        if (!log) {
            return res.status(404).send({ message: "Log not found" });
        }
        await log.destroy();
        res.send({ message: "Log deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};