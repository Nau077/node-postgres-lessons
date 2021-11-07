module.exports = class Student {
  constructor(student) {
    this.student = {
      id: student.id,
      name: student.name,
      phone_number: student.phone_number,
    };
  }

  get $student() {
    return this.student;
  }
};
