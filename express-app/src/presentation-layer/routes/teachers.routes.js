const teachersController = require("../controllers/teachers.controller");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/teachers/", jsonParser, teachersController.getTeachers);
  app.patch("/api/teacher/", jsonParser, teachersController.updateTeacher);
  app.delete("/api/teacher/", jsonParser, teachersController.removeTeacher);
  app.post("/api/teacher/", jsonParser, teachersController.addTeacher);
};
