module.exports = class Student {
  constructor(student) {
     this.student = {
      id: student.id,
      name: student.name,
      phone_number: student.phone_number,
      password: student.password
    };

    return this.student;
  }

  get $student() {
    return this.student;
  }
};
