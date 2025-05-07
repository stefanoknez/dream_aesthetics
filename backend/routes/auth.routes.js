module.exports = function(app) {
    const { verifySignUp } = require("../middlewares");
    const controller = require("../controllers/auth.controller");

    app.post("/api/auth/signup", [verifySignUp.checkDuplicateUsername], controller.signup);
    app.post("/api/auth/signin", controller.signin);
};