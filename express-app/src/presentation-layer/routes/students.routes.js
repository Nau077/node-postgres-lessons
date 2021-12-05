const studentsController = require("../controllers/students.controller");
const authJwt = require("../middleware/auth-jwt.middleware");

module.exports = function (app) {
  app.get(
      "/api/students/",
      [authJwt.verifyToken, authJwt.isStudent],
      studentsController.getStudent
       );
  app.patch(
    "/api/students/",
    [authJwt.verifyToken, authJwt.isStudent],
    studentsController.updateStudent
   );
  app.post(
    "/api/students/",
    [authJwt.verifyToken, authJwt.isStudent],
    studentsController.addStudent)
};
