const UserRepository = require("../../data-layer/students.repository");

module.exports = class Student {
  getStudents() {
    const userRepository = new UserRepository();
    return userRepository.getAllStudents();
  }

  getOneStudent(id) {
    const userRepository = new UserRepository();
    return userRepository.getOneStudent(id);
  }
};
