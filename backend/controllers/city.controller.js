const db = require("../models");
const City = db.City;

exports.getAllCities = async (req, res) => {
    try {
        const cities = await City.findAll();
        res.json(cities);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getCityById = async (req, res) => {
    try {
        const city = await City.findByPk(req.params.id);
        if (!city) {
            return res.status(404).send({ message: "City not found" });
        }
        res.json(city);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.createCity = async (req, res) => {
    try {
        const { name, postal_code, country } = req.body;
        const newCity = await City.create({ name, postal_code, country });
        res.status(201).json(newCity);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateCity = async (req, res) => {
    try {
      const city = await City.findByPk(req.params.id);
      if (!city) {
        return res.status(404).send({ message: "City not found" });
      }
      await city.update(req.body);
  
      await db.Log.create({
        user_id: req.userId,
        action: "Update City",
        description: `Admin updated city ID ${req.params.id}.`,
        timestamp: new Date()
      });
  
      res.json(city);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  
exports.deleteCity = async (req, res) => {
    try {
        const city = await City.findByPk(req.params.id);
        if (!city) {
            return res.status(404).send({ message: "City not found" });
        }
        await city.destroy();
        res.send({ message: "City deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};