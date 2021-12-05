const LessonsUseCase = require("../../domain-layer/use-cases/lessons.use-case");

exports.getLessons = async (req, res) => {
  try {
    const lessonsUseCase = new LessonsUseCase();

    if (req?.query?.id) {
      const id = req.query.id;

      const lesson = await lessonsUseCase.getOneLesson(id);
      return res.status(200).send(lesson);
    }

    if (req?.query?.offset && req?.query?.limit) {
      const lessons = await lessonsUseCase.getLessons(
        req.query.offset,
        req.query.limit
      );
      return res.status(200).send(lessons);
    }
  } catch (error) {
      return res.status(400).send(error);
  }
};

exports.addLesson = async (req, res) => {
  try {
    const lessonsUseCase = new LessonsUseCase();
    const data = req.body;

    if (data?.subjectStudensId) {
      const student = await lessonsUseCase.addLesson(data.subjectStudensId);
      return res.status(200).send(student);
    }
  } catch (error) {
 
      return res.status(400).send(error);
  }
};
