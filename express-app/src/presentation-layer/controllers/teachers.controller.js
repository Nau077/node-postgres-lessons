const TeachersUseCase = require("../../domain-layer/use-cases/teachers.use-case");
const ApiError = require("../../utils/ErrorHelper");

exports.getTeachers = async (req, res) => {
  const teachersUseCase = new TeachersUseCase();

  if (req?.query?.id) {
    const id = req.query.id;

    try {
      const teacher = await teachersUseCase.getOneTeacher(id);
      return res.status(200).send(teacher);
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.code).send(error.message);
      } else {
        return res.status(500).send(error);
      }
    }
  }

  try {
    const teachers = await teachersUseCase.getTeachers();
    return res.status(200).send(teachers);
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.code).send(error.message);
    } else {
      return res.status(400).send(error);
    }
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const teachersUseCase = new TeachersUseCase();
    const data = req.body;

    if (data) {
      const student = await teachersUseCase.updateTeacher(data);
      return res.status(200).send(student);
    } else {
      return res.status(400).send("Нет данных для изменения");
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.code).send(error.message);
    } else {
      return res.status(400).send(error);
    }
  }
};

exports.addTeacher = async (req, res) => {
  try {
    const teachersUseCase = new TeachersUseCase();
    const data = req.body;

    if (data) {
      const student = await teachersUseCase.addTeacher(data);
      return res.status(200).send(student);
    } else {
      return res.status(400).send("Нет данных для создания");
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.code).send(error.message);
    } else {
      return res.status(400).send(error);
    }
  }
};

exports.removeTeacher = async (req, res) => {
  if (req?.query?.id) {
    const id = req.query.id;

    try {
      const teachersUseCase = new TeachersUseCase();
      const teacher = await teachersUseCase.removeTeacher(id);

      return res.status(200).send(teacher);
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.code).send(error.message);
      } else {
        return res.status(400).send(error);
      }
    }
  }

  if (!req?.query?.id) {
    return res.status(400).send("Нет id в query для удаления");
  }
};
