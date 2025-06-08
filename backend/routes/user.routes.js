const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.get("/api/users", [authJwt.verifyToken, authJwt.isAdmin], controller.findAllUsers);

  app.put("/api/users/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateUser);


  app.delete("/api/users/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);

  app.get("/api/user", [authJwt.verifyToken], controller.userBoard);
  app.get("/api/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
};