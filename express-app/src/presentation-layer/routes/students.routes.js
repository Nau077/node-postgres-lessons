const studentsController = require("../controllers/students.controller");

module.exports = function (app) {
  app.get("/api/students/", studentsController.getStudents);
  app.patch("/api/student/", studentsController.updateStudent);
};
