const teachersController = require("../controllers/teachers.controller");

module.exports = function (app) {
  app.get("/api/teachers/", teachersController.getTeachers);
  app.patch("/api/teachers/", teachersController.updateTeacher);
  app.delete("/api/teachers/", teachersController.removeTeacher);
  app.post("/api/teachers/", teachersController.addTeacher);
};
