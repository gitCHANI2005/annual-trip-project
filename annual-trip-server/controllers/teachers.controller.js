const store = require('../data/store');
const {
  validatePersonFields,
  isValidIsraeliIdFormat,
  isDuplicateId
} = require('../utils/validators');

function createTeacher(req, res) {
    const {id, firstName, lastName, className} = req.body;

    const fieldsValidation = validatePersonFields({id, firstName, lastName, className});
    if (!fieldsValidation.isValid) {
        return res.status(400).json({ message: fieldsValidation.message });
    }

    if (!isValidIsraeliIdFormat(id)) {
        return res.status(400).json({ message: 'ID must contain exactly 9 digits' });
    }
    console.log('store =', store);
    console.log('store.teachers =', store.teachers);
    if (isDuplicateId(id, store.teachers)) {
        return res.status(400).json({ message: 'ID already exists' });
    }

    const newTeacher = {
        id: String(id),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        className: className.trim(),
        students: []
    };

    store.teachers.push(newTeacher);

    return res.status(201).json({
        message: 'Teacher created successfully',
        teacher: newTeacher
    });
}

function getAllTeachers(req, res) {
    return res.status(200).json(store.teachers);
}

function getAllTeachers(req, res) {
    return res.status(200).json(store.teachers);
}

function getTeacherById(req, res) {
    const { id } = req.params;
    const teacher = store.teachers.find(t => t.id === String(id));
    
    if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
    }

    return res.status(200).json(teacher);
}

function getTecherStudents(req, res) {
    const { id } = req.params;

    const teacher = store.teachers.find(t => t.id === String(id));
    
    if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
    }

    const studentsInClass = store.students.filter(
        s => s.className === teacher.className);    

    return res.status(200).json({
        teacherId: teacher.id,
        className: teacher.className,
        students: studentsInClass
    });
}

module.exports = {
    createTeacher,
    getAllTeachers,
    getTeacherById,
    getTecherStudents
};