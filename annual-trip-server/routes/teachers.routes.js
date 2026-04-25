const express = require('express');
const {
    createTeacher,
    getAllTeachers,
    getTeacherById,
    getTecherStudents,
} = require('../controllers/teachers.controller');
const teacherAuth = require('../middlewares/teacherAuth.middleware');

const router = express.Router();

router.post('/', createTeacher);

router.get('/', teacherAuth, getAllTeachers);
router.get('/:id', teacherAuth, getTeacherById);
router.get('/:id/students', teacherAuth, getTecherStudents);

module.exports = router;
