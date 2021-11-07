module.exports = class Teacher {
  teacher;

  constructor(teacher) {
    this.teacher = {
      id: teacher.id,
      subjectName: teacher.subject_name,
      workExperience: teacher.work_experience,
      isUnionMember: teacher.is_union_member,
      teacherName: teacher.teacher_name,
    };

    return this.teacher;
  }

  get teacher() {
    return this.teacher;
  }
};
