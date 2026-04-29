const pool = require('../db/db');

const { isValidIsraeliId, hasRequiredFields, isValidCoordinates } = require('../utils/validators');

const { getlocationtime, convertDmsToDecimal} = require('../utils/location');

async function updateTeacherLatestLocation(req, res) {
  const { ID, Coordinates, Time } = req.body;

  if (!hasRequiredFields({ ID, Coordinates, Time })) {
    return res.status(400).json({
      message: 'ID, Coordinates and Time are required'
    });
  }
  const teacherid = ID;
  const longitude = convertDmsToDecimal(Coordinates?.Longitude);
  const latitude = convertDmsToDecimal(Coordinates?.Latitude);
  const locationtime = Time;

  if (!isValidIsraeliId(teacherid)) {
    return res.status(400).json({
      message: 'Teacher ID must contain exactly 9 digits'
    });
  }

  if (!isValidCoordinates(longitude, latitude)) {
    return res.status(400).json({
      message: 'Invalid coordinates'
    });
  }

  try {
   const teacherExists = await pool.query(
      'SELECT id FROM "teachers" WHERE id = $1',
      [String(teacherid)]
    );

    if (teacherExists.rows.length === 0) {
      return res.status(404).json({
        message: 'Teacher not found'
      });
    }

    const result = await pool.query(
      `
      INSERT INTO "teacherlatestlocations" ("teacherid", longitude, latitude, "locationtime")
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ("teacherid")
      DO UPDATE SET
        longitude = EXCLUDED.longitude,
        latitude = EXCLUDED.latitude,
        "locationtime" = EXCLUDED."locationtime"
      RETURNING *
      `,
      [String(teacherid), Number(longitude), Number(latitude), getlocationtime(locationtime)]
    );

    return res.status(200).json({
      message: 'Teacher location updated successfully',
      location: result.rows[0]
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to update teacher location'
    });
  }
}

async function updateStudentLatestLocation(req, res) {
  const { ID, Coordinates, Time } = req.body;

  console.log('--- STUDENT LOCATION REQUEST ---');
  console.log('req.body:', req.body);
  console.log('Coordinates:', Coordinates);
  console.log('Coordinates.Longitude:', Coordinates?.Longitude);
  console.log('Coordinates.Latitude:', Coordinates?.Latitude);

  if (!hasRequiredFields({ ID, Coordinates, Time })) {
    return res.status(400).json({
      message: 'ID, Coordinates and Time are required'
    });
  }

  const studentid = ID;
  const longitude = convertDmsToDecimal(Coordinates?.Longitude);
  const latitude = convertDmsToDecimal(Coordinates?.Latitude);
  const locationtime = Time;

  console.log('studentid:', studentid);
  console.log('converted longitude:', longitude);
  console.log('converted latitude:', latitude);
  console.log('Number longitude:', Number(longitude));
  console.log('Number latitude:', Number(latitude));
  console.log('locationtime:', locationtime);

  if (!isValidIsraeliId(studentid)) {
    return res.status(400).json({
      message: 'Student ID must contain exactly 9 digits'
    });
  }

  if (!isValidCoordinates(longitude, latitude)) {
    return res.status(400).json({
      message: 'Invalid coordinates'
    });
  }

  try {
    const studentExists = await pool.query(
      'SELECT id FROM "students" WHERE id = $1',
      [String(studentid)]
    );

    if (studentExists.rows.length === 0) {
      return res.status(404).json({
        message: 'Student not found'
      });
    }

    const result = await pool.query(
      `
      INSERT INTO "studentlatestlocations" ("studentid", longitude, latitude, "locationtime")
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ("studentid")
      DO UPDATE SET
        longitude = EXCLUDED.longitude,
        latitude = EXCLUDED.latitude,
        "locationtime" = EXCLUDED."locationtime"
      RETURNING *
      `,
      [String(studentid), Number(longitude), Number(latitude), getlocationtime(locationtime)]
    );

    return res.status(200).json({
      message: 'Student location updated successfully',
      location: result.rows[0]
    });
  } catch (error) {
    console.error(error);


    console.log('DB returned location:', result.rows[0]);
    
    return res.status(500).json({
      message: 'Failed to update student location'
    });
  }
}

module.exports = {
  updateTeacherLatestLocation,
  updateStudentLatestLocation
};