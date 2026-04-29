const express = require('express');
const {
  updateTeacherLatestLocation,
  updateStudentLatestLocation,
} = require('../controllers/location.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const teacherAuthNMiddleware = require('../middlewares/teacherAuth.middleware');
const deviceKeyMiddleware = require('../middlewares/deviceKey.middleware');

const router = express.Router();

router.post('/teacher/latest', 
  deviceKeyMiddleware,
  updateTeacherLatestLocation,
  );

router.post('/student/latest',
  deviceKeyMiddleware,
  updateStudentLatestLocation);

module.exports = router;