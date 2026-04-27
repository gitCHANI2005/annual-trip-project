const bcrypt = require('bcrypt');
const pool = require('../db/db');
const {
   isValidIsraeliId,
  hasRequiredFields
 } = require('../utils/validators');

async function createTeacher(req, res) {
  const { id, firstname, lastname, classname, password } = req.body;
  if (!hasRequiredFields({ id, firstname, lastname, classname, password })) {
    return res.status(400).json({
      message: 'Missing required fields: id, firstname, lastname, classname, password'
    });
  }

  if (!isValidIsraeliId(id)) {
    return res.status(400).json({
      message: 'ID must contain exactly 9 digits'
    });
  }

  try {
    const existingTeacher = await pool.query(
      'SELECT id FROM "teachers" WHERE id = $1',
      [String(id)]
    ); 

    if (existingTeacher.rows.length > 0) {
      return res.status(400).json({
        message: 'ID already exists'
      });
    }

    const passwordhash = await bcrypt.hash(password, 10); 
    const result = await pool.query(
      'INSERT INTO "teachers" (id, "firstname", "lastname", "passwordhash", "classname") VALUES ($1, $2, $3, $4, $5) RETURNING id, "firstname", "lastname", "classname"',
      [String(id), firstname.trim(), lastname.trim(), passwordhash, classname.trim()]
    );

    return res.status(201).json({
      message: 'Teacher created successfully',
      teacher: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating teacher:', error);
    return res.status(500).json({ 
      message: 'Server error while creating teacher'
    });
  }
}

async function getAllTeachers(req, res) {
  try {
    const result = await pool.query(
      'SELECT id, "firstname", "lastname", "classname" FROM "teachers" ORDER BY "lastname", "firstname"'
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to fetch teachers'
    });
  }
}

async function getAllStudents(req, res) {
  try {
    const result = await pool.query(
      'SELECT id, "firstname", "lastname", "classname" FROM "students" ORDER BY "classname", "lastname", "firstname"'
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to fetch students'
    });
  }
}

module.exports = {
  createTeacher,
  getAllStudents,
  getAllTeachers
};