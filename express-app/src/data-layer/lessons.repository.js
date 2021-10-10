const knex = require("../../config/knex.config");
// const ApiError = require("../utils/ErrorHelper");

const LESSONS_TABLE = "lessons";

module.exports = class LessonsRepository {
  async getOneLesson(subjects_students_id) {
    try {
      const lesson = await knex(LESSONS_TABLE)
        .innerJoin(
          "subjectsstudents",
          "lessons.subjects_students_id",
          "subjectsstudents.id"
        )
        .innerJoin("students", "subjectsstudents.students_id", "students.id")
        .innerJoin("subjects", "subjectsstudents.subjects_id", "subjects.id")
        .select(
          "students.name as students_name",
          "subjects.name as subjects_name",
          "lessons.id as lesson_id",
          "lessons.lessons_start_time",
          "lessons.lessons_end_time",
          "lessons.subjects_students_id"
        )
        .where({ "lessons.subjects_students_id": subjects_students_id });

      return lesson;
    } catch (e) {
      throw e;
    }
  }

  async getLessons(offset, limit) {
    try {
      const lessons = await knex(LESSONS_TABLE)
        .innerJoin(
          "subjectsstudents",
          "lessons.subjects_students_id",
          "subjectsstudents.id"
        )
        .innerJoin("students", "subjectsstudents.students_id", "students.id")
        .innerJoin("subjects", "subjectsstudents.subjects_id", "subjects.id")
        .select(
          "students.name as students_name",
          "subjects.name as subjects_name",
          "lessons.id as lesson_id",
          "lessons.lessons_start_time",
          "lessons.lessons_end_time",
          "lessons.subjects_students_id"
        )
        .limit(limit)
        .offset(offset);

      return lessons;
    } catch (e) {
      throw e;
    }
  }

  async addLesson(data) {
    try {
      const result = await knex(LESSONS_TABLE).insert(data);
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }
};
