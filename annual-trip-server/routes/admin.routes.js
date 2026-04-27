const express = require('express');
const {
  getAllTeachers,
  getAllStudents,
  createTeacher
} = require('../controllers/admin.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const adminAuthNMiddleware = require('../middlewares/adminAuth.middleware');

const router = express.Router();

router.use(authMiddleware, adminAuthNMiddleware);

router.get('/teachers', getAllTeachers);

router.get('/students', getAllStudents);

router.post('/teacher', createTeacher);

module.exports = router;