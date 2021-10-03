module.exports = class Lesson {
  constructor(lesson) {
    this.lesson = {
      id: student.id,
      subject: student.name,
      teacher: lesson.teacher_name,
      lesson_start_time: lesson.lesson_start_time,
      lesson_end_time: lesson.lesson_end_time
    };
  }

  get $lesson() {
    return this.lesson;
  }
};
