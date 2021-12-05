const StudentRepository = require("../../../data-layer/students.repository");
const Student = require("../../entities/student.entity");
const StudentsMapper = require("./students-auth-mapper")
const { PropertyRequiredError, errors } = require("../../../utils/error.util");
const HandlerUseCase = require("../common/handler.use-case");

module.exports = class StudentUseCase extends HandlerUseCase{
    constructor() {
        const mapFields = {
          id: "id",
          name: "name",
          phone_number: "phone_number",
          password: "password"
        };
        super(mapFields);
    }
  
  async addOne(payload) {
        const fields = payload.data["fields"];

        if (!fields || !fields.length || !Array.isArray(fields)) {
            throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
        }
        
        const isStringChecked = this.checkStringFieldsInsert(fields);
    
        if (!isStringChecked) {
          throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
        }

      try {
         const studentRepository = new StudentRepository();
         const data = await studentRepository.addStudent(
            this.reduceFields(fields)
          );

          return new Student(data);
      } catch (error) {
          throw error;
      }
  }

  async getAll() {
    try {
      const userRepository = new StudentRepository();
      const students = await userRepository.getAllStudents();

      const mappedStudents = students.map(el => new StudentsMapper(el))
      return mappedStudents;

    } catch (error) {
      throw error;
    }
  }

 async getOne(phoneNumber) {
    try {
      const userRepository = new StudentRepository();
      const studentData = await userRepository.getOneStudent(phoneNumber);

      if (!studentData) {
          return null
      }
 
      return new StudentsMapper(new Student(studentData));
    } catch (error) {
      throw error;
    }
  }

  async updateOne(phoneNumber, id) {
    try {
        const userRepository = new StudentRepository();
        const student = await userRepository.updateOneStudent(phoneNumber, id);
        return student;        
    } catch (error) {
        throw error;
    }
  }
};
