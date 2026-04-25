const express = require('express');
const {
  createStudent,
  getAllStudents,
  getStudentById
} = require('../controllers/students.controller');
const teacherAuth = require('../middlewares/teacherAuth.middleware');

const router = express.Router();

router.post('/', createStudent);

router.get('/', teacherAuth, getAllStudents);
router.get('/:id', teacherAuth, getStudentById);

module.exports = router;