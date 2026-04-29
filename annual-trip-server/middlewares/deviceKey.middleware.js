function deviceKeyMiddleware(req, res, next) {
  const deviceKey = req.header('X-Device-Key');

    if (!deviceKey) {
    return res.status(400).json({
      message: 'Missing X-Device-Key header'
    });
  }

  const validDeviceKeys = [
    process.env.STUDENT_DEVICE_KEY,
    process.env.TEACHER_DEVICE_KEY,
  ];

  if (!validDeviceKeys.includes(deviceKey)) {
    return res.status(401).json({
      message: 'Invalid device key'
    });
  }

    next();
}

module.exports = deviceKeyMiddleware;