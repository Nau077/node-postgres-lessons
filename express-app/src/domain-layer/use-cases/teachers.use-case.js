// teachers - insert - сделать метод checkStringFieldsInsert в репозитории
// внутри use case
// проверить delete

const TeacherRepository = require("../../data-layer/teachers.repository");
const ApiError = require("../../utils/ErrorHelper");
const Teacher = require("../entities/teacher.entity");

module.exports = class TeacherUseCase {
    mapFields = {
        id: "id",
        name: "name",
        work_experience: "work_experience",
        phone_number: "phone_number",
        subject_id: "subject_id",
        is_union_member: "is_union_member"
    };

  async getTeachers() {
    const teacherRepository = new TeacherRepository();
    try {
      const teachersDb = await teacherRepository.getTeachers();
      const teachers = teachersDb.map(teacherDb => new Teacher(teacherDb))

      return teachers
    } catch (error) {
      throw error;
    }
  }

  async getOneTeacher(id) {
    try {
      const teacherDb = await teacherRepository.getOneTeacher(id);
      const teacher = new Teacher(teacherDb);
      
      return teacher;
    } catch (error) {
      throw error;
    }
  }

  async updateTeacher(data) {
    const teacherRepository = new TeacherRepository();

    if (!data.fields && !Array.isArray(data.fields) && !data.fields.length) {
      const error = new ApiError("422", "Нет данных для обновления");
      throw error;
    }
    const elWithId = data.fields.find(el => el.id)

    if (!elWithId) {
      const error = new ApiError("422", "Нет id для обновления");
      throw error;
    }
    const fields = data.fields;
    const isStringChecked = this.checkStringFields(fields);

    if (!isStringChecked) {
      const error = new ApiError("422", "Неверные поля переданы");
      throw error;
    }

    try {
      const updatedTeacher = await teacherRepository.updateOneTeacher(elWithId.id, this.reducefields(fields));
      const teacher = new Teacher(updatedTeacher);
      
      return teacher;
    } catch (error) {
      throw error;
    }
  }

  async addTeacher(data) {
    const teacherRepository = new TeacherRepository();

    if (!data.fields && !Array.isArray(data.fields) && !data.fields.length) {
      const error = new ApiError("422", "Нет данных для обновления");
      throw error;
    }

    try {
      const fields = data.fields;
      const teacher = await teacherRepository.addTeacher(fields);
      return teacher;
    } catch (error) {
      throw error;
    }
  }

  removeTeacher(id) {
    const teacherRepository = new TeacherRepository();
    return teacherRepository.removeOneTeacher(id);
  }

  checkStringFields(fields) {
    const IS_VALID = true;
    const fieldsNormalized = fields
            .map(el => Object.entries(el)[0])
    
    fieldsNormalized.some(([key, _]) => {
      if (!this.mapFields[key]) {
        return !IS_VALID;
      }
    });
  
    return IS_VALID;
  }

  reducefields(fields) {
    return fields.reduce((acc, el) => {
      const entriesEl = Object.entries(el);
      acc[entriesEl[0][0]] = entriesEl[0][1];
      return acc;
    }, {});
  }
};
