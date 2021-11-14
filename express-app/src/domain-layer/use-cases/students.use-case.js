const StudentRepository = require("../../data-layer/students.repository");
const Student = require("../entities/student.entity");
const { PropertyRequiredError, errors } = require("../../utils/error.util");
const HandlerUseCase = require("./common/handler.use-case");

module.exports = class StudentUseCase extends HandlerUseCase{

  addStudent() {
        if (!data.fields || !Array.isArray(data.fields) || !data.fields.length) {
            throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
        }

      try {
         const studentRepository = new StudentRepository();
         const student = await studentRepository.addTeacher(
            this.reduceFields(fields)
          );
    
          return student;
      } catch (error) {
          throw error;
      }
  }

  getStudents() {
    try {
      const userRepository = new StudentRepository();
      return userRepository.getAllStudents();
    } catch (error) {
      throw error;
    }
  }

  getOneStudent(id) {
    try {
      const userRepository = new StudentRepository();
      const studentData = userRepository.getOneStudent(id);
      const student = new Student(studentData);

      return student.$student;
    } catch (error) {
      throw error;
    }
  }

  updateStudent(phone_number, id) {
    const userRepository = new StudentRepository();
    return userRepository.updateOneStudent(phone_number, id);
  }
};
