const express = require('express');
const {
  updateTeacherLatestLocation,
  updateStudentLatestLocation,
} = require('../controllers/location.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const teacherAuthNMiddleware = require('../middlewares/teacherAuth.middleware');

const router = express.Router();

router.use(authMiddleware, teacherAuthNMiddleware);

router.post('/teacher/latest', updateTeacherLatestLocation);

router.post('/student/latest', updateStudentLatestLocation);

module.exports = router;