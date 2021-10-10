const lessons = require("../controllers/lessons.controller");
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

  app.get("/api/lessons/", jsonParser, lessons.getLessons);
  app.post("/api/lesson/", jsonParser, lessons.addLesson);
};
