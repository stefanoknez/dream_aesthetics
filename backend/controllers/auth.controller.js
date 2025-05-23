const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: req.body.role || "USER"
    });

    await db.Log.create({
      user_id: user.id,
      action: "User Signup",
      description: `User '${user.username}' successfully registered.`,
      timestamp: new Date()
    });

    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });

    await db.Log.create({
      user_id: user.id,
      action: "User Login",
      description: `User '${user.username}' successfully signed in.`,
      timestamp: new Date()
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      role: user.role,
      accessToken: token
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};