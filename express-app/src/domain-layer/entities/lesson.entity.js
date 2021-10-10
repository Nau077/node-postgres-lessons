module.exports = class Lesson {
  constructor(lesson) {
    return (this.lesson = {
      id: lesson.lesson_id,
      subject: lesson.subjects_name,
      student: lesson.students_name,
      lesson_start_time: lesson.lessons_start_time,
      lesson_end_time: lesson.lessons_end_time,
      subjects_students_id: lesson.subjects_students_id
    });
  }

  get $lesson() {
    return this.lesson;
  }
};
