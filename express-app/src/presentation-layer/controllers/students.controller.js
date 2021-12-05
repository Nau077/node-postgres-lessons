const StudentsUseCase = require("../../domain-layer/use-cases/students/students.use-case");

exports.addStudent = async (req, res) => {
    try {
        const studentsUseCase = new StudentsUseCase();
        const data = req.body;
    
        if (data) {
          const teacher = await studentsUseCase.addOne(data);
    
          return res.status(200).send(teacher);
        }
      } catch (error) {
        return res.status(400).send(error);
      }    
}

exports.getStudent = async (req, res) => {
  try {
    const studentsUseCase = new StudentsUseCase();

    if (req?.query?.id) {
      const id = req.query.id;

      const student = await studentsUseCase.getOne(id);
      return res.status(200).send(student);
    }

    const students = await studentsUseCase.getAll();

    return res.status(200).send(students);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const studentsUseCase = new StudentsUseCase();
    const data = req.body;

    if (data?.phone_number) {
      const student = await studentsUseCase.updateOne(
        data.phone_number,
        data.id
      );
      return res.status(200).send(student);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: err.message });
  }
};
