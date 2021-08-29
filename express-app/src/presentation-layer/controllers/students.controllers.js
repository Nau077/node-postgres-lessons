const StudentsUseCase = require("../../domain-layer/use-cases/students.use-case");

exports.getStudents = async (req, res) => {
  try {
    const studentsUseCase = new StudentsUseCase();

    if (req?.query?.id) {
      console.log(req.query);
      const id = req.query.id;

      const student = await studentsUseCase.getOneStudent(id);
      return res.status(200).send(student);
    }

    const students = await studentsUseCase.getStudents();

    return res.status(200).send(students);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: err.message });
  }
};