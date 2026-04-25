require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const teachersRouter = require('./routes/teachers.routes');
const studentsRouter = require('./routes/students.routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the annual trip server!' });
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/teachers', teachersRouter);
app.use('/students', studentsRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Route Not Found' });
});
module.exports = app;
