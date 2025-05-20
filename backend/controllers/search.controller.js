const db = require("../models");
const { Op } = require("sequelize");
const Clinic = db.Clinic;
const City = db.City;
const AppointmentRequest = db.AppointmentRequest;
const User = db.User;

exports.searchClinics = async (req, res) => {
    try {
        const { query, city_id } = req.query;

        const condition = {
            [Op.and]: [
                query ? {
                    [Op.or]: [
                        { name: { [Op.like]: `%${query}%` } },
                        { description: { [Op.like]: `%${query}%` } },
                        { address: { [Op.like]: `%${query}%` } }
                    ]
                } : {},
                city_id ? { city_id } : {}
            ]
        };

        const clinics = await Clinic.findAll({ where: condition });
        res.json(clinics);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.searchAppointmentsByDate = async (req, res) => {
    try {
        const { date, status } = req.query;
        if (!date) {
            return res.status(400).send({ message: "Date query is required." });
        }

        const start = new Date(date);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        const condition = {
            datetime: {
                [Op.between]: [start, end]
            },
            ...(status ? { status } : {})
        };

        const appointments = await AppointmentRequest.findAll({
            where: condition
        });
        res.json(appointments);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.searchUsersByRole = async (req, res) => {
    try {
        const { role } = req.query;
        const users = await User.findAll({ where: role ? { role } : {} });
        res.json(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.searchCities = async (req, res) => {
    try {
        const { query } = req.query;
        const cities = await City.findAll({
            where: query ? {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { country: { [Op.like]: `%${query}%` } }
                ]
            } : {}
        });
        res.json(cities);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};