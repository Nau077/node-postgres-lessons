const knex = require("../../config/knex.config");
const STUDENTS_TABLE = "students";
const { DataBaseError, errors } = require("../utils/error.util");

module.exports = class StudentRepository {

  async addStudent(fields) {
    try {
      const result = await knex(STUDENTS_TABLE)
        .insert(fields)
        .returning("*");

      return result[0];
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

  async getOneStudent(phone_number) {
    try {
      const student = await knex
        .select("id", "name", "phone_number", "password")
        .from("students")
        .where({ phone_number });
    
      if (!student[0]) {
          return null
      }

      return student[0];
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
