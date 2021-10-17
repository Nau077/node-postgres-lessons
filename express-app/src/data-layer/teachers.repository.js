const knex = require("../../config/knex.config");
const ApiError = require("../utils/ErrorHelper");

const modelFields = {
  id: "id",
  name: "name",
  work_experience: "work_experience",
  phone_number: "phone_number",
  subject_id: "subject_id",
  is_union_member: "is_union_member"
};

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
    
     return updatedTeacher[0];
   } catch (e) {
     trx.rollback();
     throw e;
   }
  }

  async removeTeacher(id) {
    try {
      await knex(TEACHERS_TABLE)
        .del()
        .where({
          id
        })
        .returning("id")
        
    } catch (error) {
      throw error;
    }
  }

  async addTeacher(fields) {
    const isStringChecked = checkStringFieldsInsert(fields);
    if (!isStringChecked) {
      let error = new ApiError("422", "Неверные поля переданы");
      throw error;
    }
    const trx = await knex.transaction();
    try {
      const result = await knex(TEACHERS_TABLE)
        .transacting(trx)
        .insert(redudefields(fields))
        .returning("id");
      await trx.commit();
      return {
        id: result[0]
      };
    } catch (e) {
      trx.rollback();
      let error = new ApiError("422", "Ошибка атомарности: " + e);
      throw error;
    }
  }
};

function checkStringFieldsInsert(fields) {
  const keys = fields.map(val => {
    return Object.entries(val)[0][0];
  });
  const IS_VALID = true;
  console.log(keys)
  for (let i = 0; i < keys.length; i++) {
    if (!(keys[i] in modelFields)) return !IS_VALID;
  }

  return IS_VALID;
}
//eslint-disable-next-line
function getStringFields() {
  const fields = Object.entries(modelFields).map(el => el[1]);
  return fields;
}



function redudefields(fields) {
  return fields.reduce((acc, el) => {
    const entriesEl = Object.entries(el);
    acc[entriesEl[0][0]] = entriesEl[0][1];
    return acc;
  }, {});
}
