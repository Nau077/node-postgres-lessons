const studentsRoutesInit = require("./students.routes");
const teachersRoutesInit = require("./teachers.routes");
const lessonsRoutesInit = require("./lessons.routes");

const routeInit = app => {
  studentsRoutesInit(app);
  teachersRoutesInit(app);
  lessonsRoutesInit(app);
};
module.exports = {
  routeInit
};
