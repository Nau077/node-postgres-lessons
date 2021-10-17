const studentsRoutesInit = require("./students.routes");
const teachersRoutesInit = require("./teachers.routes");
const lessonsRoutesInit = require("./lessons.routes");

const routeInit = (app, express) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  studentsRoutesInit(app);
  teachersRoutesInit(app);
  lessonsRoutesInit(app);
};
module.exports = {
  routeInit
};
