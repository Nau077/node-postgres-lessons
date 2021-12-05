const StudentsUseCase = require("../students/students.use-case");

const authStrategy =  {
    "students": StudentsUseCase
}

module.exports = {
    authStrategy
}