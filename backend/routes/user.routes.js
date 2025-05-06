const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.get("/api/user", [authJwt.verifyToken], controller.userBoard);
    app.get("/api/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
};