const teachersController = require("../controllers/teachers.controller");

module.exports = function(app) {
  app.get("/api/teachers/", teachersController.getTeachers);
  app.patch("/api/teacher/", teachersController.updateTeacher);
  app.delete("/api/teacher/", teachersController.removeTeacher);
  app.post("/api/teacher/", teachersController.addTeacher);
};
