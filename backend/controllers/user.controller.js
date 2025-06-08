const db = require("../models");
const User = db.User;

// Vrati sve korisnike
exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "role"]
    });
    res.json(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Promjena uloge korisnika
exports.updateUserRole = async (req, res) => {
  try {
    const id = req.params.id;
    const { role } = req.body;
    await User.update({ role }, { where: { id } });
    res.send({ message: "User role updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Brisanje korisnika
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.destroy({ where: { id } });
    res.send({ message: "User deleted successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, email, role } = req.body;

    // Validacija
    if (email && !email.includes("@")) {
      return res.status(400).send({ message: "Invalid email format." });
    }
    if (username && username.length < 3) {
      return res.status(400).send({ message: "Username must be at least 3 characters long." });
    }
    if (role && !["USER", "ADMIN", "CLINIC_ADMIN"].includes(role)) {
      return res.status(400).send({ message: "Invalid role." });
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (role) updateData.role = role;

    await User.update(updateData, { where: { id } });

    res.send({ message: "User updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};