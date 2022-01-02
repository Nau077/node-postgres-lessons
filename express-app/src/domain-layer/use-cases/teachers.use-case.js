const TeacherRepository = require("../../data-layer/teachers.repository");
const Teacher = require("../entities/teacher.entity");
const HandlerUseCase = require("./common/handler.use-case");
const { PropertyRequiredError, errors } = require("../../utils/error.util");

module.exports = class TeacherUseCase extends HandlerUseCase {
  constructor() {
    const mapFields = {
      id: "id",
      name: "name",
      work_experience: "work_experience",
      phone_number: "phone_number",
      subject_id: "subject_id",
      is_union_member: "is_union_member",
    };
    super(mapFields);
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

    if (!data.fields || !Array.isArray(data.fields) || !data.fields.length) {
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    const fields = data.fields;
    const isStringChecked = this.checkStringFieldsInsert(fields);

    if (!isStringChecked) {
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    try {
      const teacher = await teacherRepository.addTeacher(
        this.reduceFields(fields)
      );

      return teacher;
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

    if (!data.fields || !Array.isArray(data.fields) || !data.fields.length) {
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    const elWithId = data.fields.find((el) => el.id);

    if (!elWithId) {
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    const fields = data.fields;
    const isStringChecked = this.checkStringFields(fields);

    if (!isStringChecked) {
      throw new PropertyRequiredError(errors.get("NO_PROPERTY"));
    }

    try {
      const updatedTeacher = await teacherRepository.updateOneTeacher(
        elWithId.id,
        this.reduceFields(fields)
      );
      const teacher = new Teacher(updatedTeacher);

      return teacher;
    } catch (error) {
      throw error;
    }
  }
};
