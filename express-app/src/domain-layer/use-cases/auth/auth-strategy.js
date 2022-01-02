const StudentsUseCase = require("../students.use-case");

const authStrategy = {
  students: StudentsUseCase,
};

module.exports = {
  authStrategy,
};
