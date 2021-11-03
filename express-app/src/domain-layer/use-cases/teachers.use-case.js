const TeacherRepository = require("../../data-layer/teachers.repository");
const Teacher = require("../entities/teacher.entitiy");

module.exports = class TeacherUseCase {

  mapFields = {
    id: "id",
    name: "name",
    work_experience: "work_experience",
    phone_number: "phone_number",
    subject_id: "subject_id",
    is_union_member: "is_union_member"
  }

  async getTeachers() {
    const teacherRepository = new TeacherRepository();

    try {
      const teachersDb = await teacherRepository.getTeachers();
      const teachers = teachersDb.map((teacherDb) => new Teacher(teacherDb));

      return teachers;
    } catch (error) {
      throw error;
    }
  }

  async getOneTeacher(id) {
    const teacherRepository = new TeacherRepository();

    try {
      const teacherDb = await teacherRepository.getOneTeacher(id);
      const teacher = new Teacher(teacherDb);

      return teacher;
    } catch (error) {
      throw error;
    }
  }

  async addTeacher(data) {
    const teacherRepository = new TeacherRepository();

    if (!data.fields && !Array.isArray(data.fields) && !data.fields.length) {
        throw "Нет данных для вставки";
    }

    const fields = data.fields;
    const isStringChecked = this.checkStringFieldsInsert(fields);

    if (!isStringChecked) {
        throw "Неверные поля переданы"
    }

    try {
        const teacher = await teacherRepository.addTeacher(this.reduceFields(fields));

        return teacher
    } catch (error) {
        throw error;
    }
  }

  async removeTeacher(id) {
      try {
        const teacherRepository = new TeacherRepository();
        const result = await teacherRepository.removeOneTeacher(id);

        return result;
      } catch (error) {
          throw error;
      }
  }

  async updateTeacher(data) {
    const teacherRepository = new TeacherRepository();

    if (!data.fields && !Array.isArray(data.fields) && !data.fields.length) {
        throw "Нет данных для обновления";
    }

    const elWithId = data.fields.find(el => el.id)

    if (!elWithId) {
        throw "Нет id для обновления"
    };

    const fields = data.fields;
    const isStringChecked  = this.checkStringFields(fields);

    if (!isStringChecked) {
        throw "Неверные поля переданы"
    };

    try {
        const updatedTeacher = await teacherRepository.updateOneTeacher(elWithId.id, this.reduceFields(fields));
 
        const teacher = new Teacher(updatedTeacher);
        return teacher;
    } catch (error) {
        throw error;
    }
  }

  checkStringFieldsInsert(fields) {
      const keys = fields.map(val => {
          return Object.entries(val)[0][0];
      });

      const IS_VALID = true;

      for (let i = 0; i < keys.length; i++) {
          if (!(keys[i]) in this.mapFields) return !IS_VALID;
      }

      return IS_VALID;
  };

  checkStringFields(fields) {
    const IS_VALID = true;
    const fieldsNormalized = fields
        .map(el => Object.entries(el)[0][0])
        
    fieldsNormalized.some(([key, _]) => {
        if (!this.mapFields[key]) {
            return !IS_VALID
        }
    });

    return IS_VALID;
  };

  reduceFields(fields) {
      return fields.reduce((acc, el) => {
          const entriesEl = Object.entries(el);
          acc[entriesEl[0][0]] = entriesEl[0][1]

          return acc;
      }, {})
  };
};
