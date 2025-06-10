const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.User;
const Clinic = db.Clinic;

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

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role, clinic_id } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).send({ message: "All required fields must be filled." });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).send({ message: "User already exists." });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });

    if (role === "CLINIC_ADMIN" && clinic_id) {
      const clinic = await Clinic.findByPk(clinic_id);
      if (clinic) {
        clinic.user_id = newUser.id;
        await clinic.save();
      }
    }

    res.status(201).send({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).send({ message: "Server error" });
  }
};

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