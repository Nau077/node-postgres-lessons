const studentsController = require("../controllers/students.controllers");
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

  app.get("/api/students/", jsonParser, studentsController.getStudents);
  app.patch("/api/students/update-phone", jsonParser, studentsController.updateStudent);
};
