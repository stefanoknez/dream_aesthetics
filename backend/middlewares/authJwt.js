const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.User;
const Clinic = db.Clinic;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length); // uklanja "Bearer "
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (user.role === "ADMIN") {
      next();
      return;
    }
    res.status(403).send({
      message: "Require Admin Role!",
    });
  } catch (err) {
    res.status(500).send({
      message: "Unable to validate user role!",
    });
  }
};

isClinicAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (user.role !== "CLINIC_ADMIN") {
      return res.status(403).send({ message: "Require Clinic Admin Role!" });
    }

    const clinic = await Clinic.findOne({ where: { user_id: req.userId } });
    if (!clinic) {
      return res.status(404).send({ message: "No clinic assigned to this user." });
    }

    req.clinicId = clinic.id; 
    next();
  } catch (err) {
    res.status(500).send({ message: "Authorization error." });
  }
};

isUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (user.role === "USER") {
      next();
      return;
    }
    res.status(403).send({
      message: "Require User Role!",
    });
  } catch (err) {
    res.status(500).send({
      message: "Unable to validate user role!",
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isClinicAdmin,
  isUser,
};

module.exports = authJwt;