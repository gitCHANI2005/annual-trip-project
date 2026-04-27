const express = require('express');
const {
    getMyStudents,
    getStudentByIdForTeacher,
    createStudent,
    getTeacherMap
} = require('../controllers/teacher.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const teacherAuthNMiddleware = require('../middlewares/teacherAuth.middleware');

const router = express.Router();

router.use(authMiddleware, teacherAuthNMiddleware);

router.get('/students', getMyStudents);
router.get('/students/:studentid', getStudentByIdForTeacher);
router.post('/student', createStudent);
router.get('/map', getTeacherMap);

module.exports = router;