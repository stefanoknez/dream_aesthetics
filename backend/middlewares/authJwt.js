const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.User;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length); 
    }

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user.role === "ADMIN") {
            next();
            return;
        }
        res.status(403).send({ message: "Require Admin Role!" });
    });
};

const authJwt = {
    verifyToken,
    isAdmin
};

module.exports = authJwt;