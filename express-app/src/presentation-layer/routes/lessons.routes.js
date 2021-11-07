const lessons = require("../controllers/lessons.controller");

module.exports = function (app) {
  app.get("/api/lessons/", lessons.getLessons);
  app.post("/api/lesson/", lessons.addLesson);
};
