const knex = require("../../config/knex.config");

module.exports = class StudentRepository {
  async getAllStudents() {
    try {
      const students = await knex("students");
      return students;
    } catch (e) {
      throw e;
    }
  }

  async getOneStudent(id) {
    try {
      const student = await knex
        .select("id", "name", "phone_number")
        .from("students")
        .where({ id: id });

      return student;
    } catch (e) {
      throw e;
    }
  }

  async updateOneStudent(phone_number, id) {
    try {
      const student = await knex("students")
        .where({ id: id })
        .update({"phone_number":  phone_number}, ["id", "name", "phone_number"])

      return student;
    } catch (e) {
      throw e;
    }
  }
};
