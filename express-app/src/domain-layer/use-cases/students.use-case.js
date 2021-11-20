const StudentRepository = require("../../data-layer/students.repository");
const Student = require("../entities/student.entity");
const { PropertyRequiredError, errors } = require("../../utils/error.util");
const HandlerUseCase = require("./common/handler.use-case");

module.exports = class StudentUseCase extends HandlerUseCase{
    constructor() {
        super.mapFields = {
          id: "id",
          name: "name",
          phone_number: "phone_number",
          password: "password"
        };
    }
  
  addOne() {
        if (!data.fields || !Array.isArray(data.fields) || !data.fields.length) {
            throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
        }

        const fields = data.fields;
        const isStringChecked = this.checkStringFieldsInsert(fields);
    
        if (!isStringChecked) {
          throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
        }

      try {
         const studentRepository = new StudentRepository();
         const student = await studentRepository.addStudent(
            this.reduceFields(fields)
          );
    
          return student;
      } catch (error) {
          throw error;
      }
  }

  getAll() {
    try {
      const userRepository = new StudentRepository();
      return userRepository.getAllStudents();
    } catch (error) {
      throw error;
    }
  }

  getOne(phoneNumber) {
    try {
      const userRepository = new StudentRepository();
      const studentData = userRepository.getOneStudent(phoneNumber);
      const student = new Student(studentData);

      return student.$student;
    } catch (error) {
      throw error;
    }
  }

  updateOne(phoneNumber, id) {
    const userRepository = new StudentRepository();
    return userRepository.updateOneStudent(phoneNumber, id);
  }
};
