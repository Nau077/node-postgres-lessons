const TeacherRepository = require("../../data-layer/teachers.repository");
const ApiError = require("../../utils/ErrorHelper") 

module.exports = class TeacherUseCase {
  getTeachers() {
    const teacherRepository = new TeacherRepository();
    try {
        return teacherRepository.getTeachers();
    } catch (error) {
        throw(error);
    }
  }

  getOneTeacher(id) {
    const teacherRepository = new TeacherRepository();
    return teacherRepository.getOneTeacher(id);
  }

  updateTeachers(data) {
    const teacherRepository = new TeacherRepository();

    if (!data.fields && !Array.isArray(data.fields) && !data.fields.length) {
        const error = new ApiError("422", "Нет данных для обновления")
        throw error
    }

    if (!data.fields.id) {
        const error = new ApiError("422", "Нет id для обновления")
        throw error
    }

    try {
        const fields = data.fields
        return teacherRepository.updateOneTeacher(fields);
    } catch (error) {
        throw(error)    
    }
  }

  async addTeacher(data) {
 
    const teacherRepository = new TeacherRepository();

    if (!data.fields && !Array.isArray(data.fields) && !data.fields.length) {
        const error = new ApiError("422", "Нет данных для обновления")
        throw error
    }

    try {
        const fields = data.fields
        const teacher = await teacherRepository.addTeacher(fields);
        return teacher;
    } catch (error) {
        throw error
    }
  }

  removeTeacher(id) {
    const teacherRepository = new TeacherRepository();
    return teacherRepository.removeOneTeacher(id);
  }
};
