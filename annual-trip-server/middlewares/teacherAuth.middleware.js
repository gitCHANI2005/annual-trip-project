const store = require('../data/store');

function teacherAuth(req, res, next) {
  const teacherId = req.header('teacher-id');

  if (!teacherId) {
    return res.status(401).json({
      message: 'Access denied. teacher-id header is required'
    });
  }

  const teacherExists = store.teachers.some(
    teacher => teacher.id === String(teacherId)
  );

  if (!teacherExists) {
    return res.status(403).json({
      message: 'Access denied. Only an existing teacher can perform this action'
    });
  }

  next();
}

module.exports = teacherAuth;