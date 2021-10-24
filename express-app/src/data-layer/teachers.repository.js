const knex = require("../../config/knex.config");
const ApiError = require("../utils/ErrorHelper");

const TEACHERS_TABLE = "teachers";

module.exports = class StudentRepository {
  async getTeachers() {

    try {
      const teachers = await knex(TEACHERS_TABLE)
        .leftOuterJoin("subjects", "teachers.subject_id", "=", "subjects.id")
        .select(
          "teachers.name as teacher_name",
          "teachers.id",
          "teachers.is_union_member",
          "teachers.work_experience",
          "subjects.name as subject_name"
        );

      if (!teachers.length) throw "Нет данных"

      return teachers;
    } catch (e) {
      throw e;
    }
  }

  async getOneTeacher(id) {
    try {
      //   SELECT teachers.name, subjects.name
      //   FROM teachers
      //   INNER JOIN subjects
      //   ON teachers.subject_id = subjects.id;

      const teacher = await knex(TEACHERS_TABLE)
        .innerJoin("subjects", "teachers.subject_id", "subjects.id")
        .select(
          "teachers.name as teacher_name",
          "teachers.id",
          "teachers.is_union_member",
          "teachers.work_experience",
          "subjects.name as subject_name"
        )
        .where({ "teachers.id": id });

        if (!teacher[0]) throw "Нет данных"

        return teacher[0];
    } catch (e) {
      throw e;
    }
  }

  async updateOneTeacher(id, fields) {
   const trx = await knex.transaction();

   try {
     const result = await knex(TEACHERS_TABLE)
       .transacting(trx)
       .join()
       .where({id})
       .update({...fields, ...{updated_at: new Date()} })
       .returning("*")

     await trx.commit();

     const updatedTeacher = await knex(TEACHERS_TABLE)
     .innerJoin("subjects", "teachers.subject_id", "subjects.id")
     .select(
       "teachers.name as teacher_name",
       "teachers.id",
       "teachers.is_union_member",
       "teachers.work_experience",
       "subjects.name as subject_name"
     )
     .where({ "teachers.id": result[0].id });

     if (!teacher[0]) throw "Нет данных"

     return updatedTeacher[0];
   } catch (e) {
     trx.rollback();
     throw e;
   }
  }

  async removeOneTeacher(id) {
    try {
    const result = await knex(TEACHERS_TABLE)
        .del()
        .where({
          id
        })
        .returning("id")

    if (!result[0]) throw `Нет записи, найденных при удалении по соотв. параметру: ${id}`

    return {
        id: result[0]
        }; 
    } catch (error) {
      throw error;
    }
  }

  async addTeacher(fields) {
    const trx = await knex.transaction({isolation: 'repeatable read'});
    
    try {
      const result = await knex(TEACHERS_TABLE)
        .transacting(trx)
        .insert(fields)
        .returning("id");
      await trx.commit();
     
    } catch (e) {
      trx.rollback();
      let error = new ApiError("422", "Ошибка атомарности: " + e);
      throw error;
    }
  }
};


