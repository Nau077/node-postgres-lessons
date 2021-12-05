module.exports = class StudentsMapper {
    constructor(student) {
        return {
            id: student.id,
            name: student.name,
            phone_number: student.phone_number
        }
    }
}