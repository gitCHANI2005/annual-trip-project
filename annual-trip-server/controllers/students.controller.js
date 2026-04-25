const store = require('../data/store');
const {
  validatePersonFields,
  isValidIsraeliIdFormat,
  isDuplicateId
} = require('../utils/validators');

function createStudent(req, res) {
  const { id, firstName, lastName, className } = req.body;

  const fieldsValidation = validatePersonFields({ id, firstName, lastName, className });
  if (!fieldsValidation.isValid) {
    return res.status(400).json({ message: fieldsValidation.message });
  }

  if (!isValidIsraeliIdFormat(id)) {
    return res.status(400).json({ message: 'ID must contain exactly 9 digits' });
  }

  if (isDuplicateId(id, store.students)) {
    return res.status(409).json({ message: 'Student with this ID already exists' });
  }

  const newStudent = {
    id: String(id),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    className: className.trim()
  };

  store.students.push(newStudent);

  return res.status(201).json({
    message: 'Student created successfully',
    student: newStudent
  });
}

function getAllStudents(req, res) {
  return res.status(200).json(store.students);
}

function getStudentById(req, res) {
  const { id } = req.params;

  const student = store.students.find(s => s.id === String(id));

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  return res.status(200).json(student);
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById
};