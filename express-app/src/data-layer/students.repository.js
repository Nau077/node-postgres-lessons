const knex = require("../../config/knex.config");
const STUDENTS_TABLE = "students";

module.exports = class StudentRepository {

  async addStudent() {

    try {
      const result = await knex(STUDENTS_TABLE)
        .insert(fields)
        .returning("*");

      return result;
    } catch (error) {
      throw new DataBaseError(errors.get("DATA_BASE_ERROR"));
    }
  }

  async getAllStudents() {
    try {
      const students = await knex("students");
      return students;
    } catch (e) {
      throw e;
    }
  }

  async getOneStudent(phoneNumber) {
    try {
      const student = await knex
        .select("id", "name", "phone_number")
        .from("students")
        .where({ phone_number: phoneNumber });

      return student;
    } catch (e) {
      throw e;
    }
  }

  async updateOneStudent(phone_number, id) {
    try {
      const student = await knex("students")
        .where({ id: id })
        .update({ phone_number: phone_number }, ["id", "name", "phone_number"]);

      return student;
    } catch (e) {
      throw e;
    }
  }
};
