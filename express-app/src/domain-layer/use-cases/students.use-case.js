const UserRepository = require("../../data-layer/students.repository");
const Student = require("../entities/student.entity");

module.exports = class StudentUseCase {
  getStudents() {
    const userRepository = new UserRepository();
    return userRepository.getAllStudents();
  }

  getOneStudent(id) {
    const userRepository = new UserRepository();
    const studentData = userRepository.getOneStudent(id);
    const student = new Student(studentData);

    return student.$student;
  }

  updateStudent(phone_number, id) {
    const userRepository = new UserRepository();
    return userRepository.updateOneStudent(phone_number, id);
  }
};
