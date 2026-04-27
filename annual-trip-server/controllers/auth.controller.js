const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const pool = require('../db/db');

const { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET } = require('../config/env');

async function login(req, res) {
  const { username, id, password } = req.body;

  if (!password) {
    return res.status(400).json({
      message: 'Password is required'
    });
  }

  if (username) {
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({
        message: 'Invalid admin credentials'
      });
    }

    const token = jwt.sign(
      {
        role: 'admin',
        username: ADMIN_USERNAME
      },
      JWT_SECRET,
      {
        expiresIn: '8h'
      }
    );

    return res.status(200).json({
      message: 'Admin login successful',
      token,
      user: {
        role: 'admin',
        username: ADMIN_USERNAME
      }
    });
  }

  if (id) {
    try {
      const result = await pool.query(
        'SELECT id, "firstname", "lastname", "classname", "passwordhash" FROM "teachers" WHERE id = $1',
        [String(id)]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({
          message: 'Invalid teacher credentials'
        });
      }

      const teacher = result.rows[0];

      const isPasswordMatch = await bcrypt.compare(password, teacher.passwordhash);

      if (!isPasswordMatch) {
        return res.status(401).json({
          message: 'Invalid teacher credentials'
        });
      }

      const token = jwt.sign(
        {
          role: 'teacher',
          id: teacher.id,
          classname: teacher.classname,
          firstname: teacher.firstname,
          lastname: teacher.lastname
        },
        JWT_SECRET,
        {
          expiresIn: '8h'
        }
      );

      return res.status(200).json({
        message: 'Teacher login successful',
        token,
        user: {
          role: 'teacher',
          id: teacher.id,
          firstname: teacher.firstname,
          lastname: teacher.lastname,
          classname: teacher.classname
        }
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: 'Server error during teacher login'
      });
    }
  }

  return res.status(400).json({
    message: 'You must send either username or id, together with password'
  });
}

module.exports = {
  login
};