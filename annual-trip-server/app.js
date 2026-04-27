require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./routes/auth.routes');
const teacherRouter = require('./routes/teacher.routes');
const adminRouter = require('./routes/admin.routes');
const locationRouter = require('./routes/location.routes');

const pool = require('./db/db');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Annual Trip API'
  });
});

app.get('db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Database connection successful',
      time: result.rows[0].now
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message
    });
  }
});

app.use('/auth', authRouter);
app.use('/teacher', teacherRouter);
app.use('/admin', adminRouter);
app.use('/location', locationRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint not found'
  });
});

module.exports = app;