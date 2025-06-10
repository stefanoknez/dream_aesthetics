const db = require("../models");
const Clinic = db.Clinic;
const Photo = db.Photo;
const Treatment = db.Treatment;
const Log = db.Log;

exports.getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.findAll();
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findByPk(req.params.id);
    if (!clinic) return res.status(404).json({ message: "Clinic not found" });
    res.json(clinic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createClinic = async (req, res) => {
  try {
    const clinic = await Clinic.create(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByPk(req.params.id);
    if (!clinic) return res.status(404).json({ message: "Clinic not found" });

    await clinic.update(req.body);
    res.json(clinic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByPk(req.params.id);
    if (!clinic) return res.status(404).json({ message: "Clinic not found" });

    await clinic.destroy();

    await Log.create({
      user_id: req.userId,
      action: "Delete Clinic",
      description: `Admin deleted clinic ID ${req.params.id}.`,
      timestamp: new Date()
    });

    res.json({ message: "Clinic deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getClinicsWithPromoImages = async (req, res) => {
  try {
    const clinics = await Clinic.findAll({
      include: [
        {
          model: Photo,
          required: false,
          order: [["uploaded_at", "DESC"]],
        },
        {
          model: Treatment,
          as: "treatments",
          through: { attributes: [] },
        },
      ],
    });

    const formatted = clinics.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      photo: c.Photos?.[0] || null,
      photos: c.Photos || [],
      treatments: c.treatments?.map((t) => t.name) || [],
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};