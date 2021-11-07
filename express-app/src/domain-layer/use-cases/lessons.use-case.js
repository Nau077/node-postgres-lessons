const LessonsRepository = require("../../data-layer/lessons.repository");
const Lesson = require("../entities/lesson.entity");

module.exports = class LessonstUseCase {
  async getLessons(offset, limit) {
    const lessonsRepository = new LessonsRepository();
    const lessons = await lessonsRepository.getLessons(offset, limit);
    const lessonsNormalized = lessons.map((el) => {
      return new Lesson(el);
    });

    return lessonsNormalized;
  }

  async getOneLesson(subjects_students_id) {
    const lessonsRepository = new LessonsRepository();
    const lessonsData = await lessonsRepository.getOneLesson(
      subjects_students_id
    );
    const lesson = new Lesson(lessonsData[0]);

    return lesson;
  }

  addLesson(subjectStudensId) {
    const lessonsRepository = new LessonsRepository();

    return lessonsRepository.addLesson({
      subjects_students_id: subjectStudensId,
    });
  }
};
