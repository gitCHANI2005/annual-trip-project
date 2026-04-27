const pool = require('../db/db');

const { isValidIsraeliId, hasRequiredFields } = require('../utils/validators');

async function getMyStudents(req, res) {
  try {
    const teacherclassname = req.user.classname;

    const result = await pool.query(
      'SELECT id, "firstname", "lastname", "classname" FROM "students" WHERE "classname" = $1 ORDER BY "lastname", "firstname"',
      [teacherclassname]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to fetch teacher students'
    });
  }
}

async function getStudentByIdForTeacher(req, res) {
  const { studentid } = req.params;

  if (!isValidIsraeliId(studentid)) {
    return res.status(400).json({
      message: 'Student ID must contain exactly 9 digits'
    });
  }

  try {
    const result = await pool.query(
      'SELECT id, "firstname", "lastname", "classname" FROM "students" WHERE id = $1 AND "classname" = $2',
      [String(studentid), req.user.classname]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Student not found in your class'
      });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to fetch student'
    });
  }
}

async function createStudent(req, res) {
  const { id, firstname, lastname } = req.body;

  const classname = req.user.classname;

  if (!hasRequiredFields({ id, firstname, lastname, classname })) {
    return res.status(400).json({
      message: 'id, firstname and lastname are required'
    });
  }

  if (!isValidIsraeliId(id)) {
    return res.status(400).json({
      message: 'Student ID must contain exactly 9 digits'
    });
  }

  try {
    const existingStudent = await pool.query(
      'SELECT id FROM "students" WHERE id = $1',
      [String(id)]
    );

    if (existingStudent.rows.length > 0) {
      return res.status(409).json({
        message: 'Student with this ID already exists'
      });
    }

    const result = await pool.query(
      'INSERT INTO "students" (id, "firstname", "lastname", "classname") VALUES ($1, $2, $3, $4) RETURNING id, "firstname", "lastname", "classname"',
      [String(id), firstname.trim(), lastname.trim(), classname]
    );

    return res.status(201).json({
      message: 'Student created successfully',
      student: result.rows[0]
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to create student'
    });
  }
}

async function getTeacherMap(req, res) {
  try {
    const teacherid = req.user.id;

    const classname = req.user.classname;

    const teacherLocationResult = await pool.query(
      'SELECT "teacherid", longitude, latitude, "locationtime" FROM "teacherlatestlocations" WHERE "teacherid" = $1',
      [teacherid]
    );

    const studentsLocationsResult = await pool.query(
      `
      SELECT 
        s.id,
        s."firstname",
        s."lastname",
        s."classname",
        sl.longitude,
        sl.latitude,
        sl."locationtime"
      FROM "students" s
      LEFT JOIN "studentlatestlocations" sl
        ON s.id = sl."studentid"
      WHERE s."classname" = $1
      ORDER BY s."lastname", s."firstname"
      `,
      [classname]
    );

    return res.status(200).json({
      teacher: {
        id: req.user.id,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        classname: req.user.classname,
        location: teacherLocationResult.rows[0] || null
      },
      students: studentsLocationsResult.rows
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to fetch map data'
    });
  }
}

module.exports = {
  getMyStudents,
  getStudentByIdForTeacher,
  createStudent,
  getTeacherMap
};