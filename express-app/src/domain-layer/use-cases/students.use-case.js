const UserRepository = require("../../data-layer/students.repository");
const Student = require("../entities/student.entity");

module.exports = class StudentUseCase {
  getStudents() {
    try {
      const userRepository = new UserRepository();
      return userRepository.getAllStudents();
    } catch (error) {
      throw error;
    }
  }

  getOneStudent(id) {
    try {
      const userRepository = new UserRepository();
      const studentData = userRepository.getOneStudent(id);
      const student = new Student(studentData);

      return student.$student;
    } catch (error) {
      throw error;
    }
  }

  updateStudent(phone_number, id) {
    const userRepository = new UserRepository();
    return userRepository.updateOneStudent(phone_number, id);
  }
};
