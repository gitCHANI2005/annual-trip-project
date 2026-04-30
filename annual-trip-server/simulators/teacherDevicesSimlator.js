const SERVER_URL = 'http://localhost:3000/location/teacher/latest';

const INTERVAL_MS = 10000

const DEVICE_KEY = 'teacher_device_key_123'

const teachers = [
  {
    ID: '115225673',
    latitude: 31.7810,
    longitude: 35.2078,
  },
  {
    ID: '215225673',
    latitude: 31.7814,
    longitude: 35.2083,
  },
  {
    ID: '315225673',
    latitude: 31.7806,
    longitude: 35.2072,
  },
];


function moveTeacher(teacher){
    const smallChange = 0.0006;

    teacher.latitude += (Math.random() - 0.5) * smallChange;
    teacher.longitude += (Math.random() - 0.5) * smallChange;
}

function decimalToDms(decimal) {
  const degrees = Math.floor(Math.abs(decimal));
  const minutesFloat = (Math.abs(decimal) - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = Math.round((minutesFloat - minutes) * 60);

  return {
    Degrees: String(degrees),
    Minutes: String(minutes),
    Seconds: String(seconds),
  };
}


function buildRequestBody(teacher){
    return{
        ID: teacher.ID,
        Coordinates: {
        Longitude: decimalToDms(teacher.longitude),
        Latitude: decimalToDms(teacher.latitude),
        },
        Time: new Date().toISOString(),
    };
}

async function sendTeacherLocation(teacher){
    moveTeacher(teacher);

    const body = buildRequestBody(teacher);

    try {
        const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'X-Device-Key': DEVICE_KEY,
        },
        body: JSON.stringify(body),
        });

        const data = await response.json().catch(() =>  null);

        if (!response.ok) {
        console.log(`Failed to update teacher ${teacher.ID}`);
        console.log('Status:', response.status);
        console.log('Response:', data);
        return;
        }

        console.log(`Updated teacher ${teacher.ID}`, body);
    } catch (error) {
        console.log(`Error while updating teacher ${teacher.ID}`);
        console.log(error.message);
    }
}

async function sendAllTeachersLocations() {
    console.log('Sending teachers locations...');

    for (const teacher of teachers) {
        await sendTeacherLocation(teacher);
    }

    console.log('Cycle completed\n');
}

function startSimulator() {
  console.log('teacher devices simulator started');
  console.log(`Sending updates to: ${SERVER_URL}`);
  console.log(`Interval: ${INTERVAL_MS / 1000} seconds\n`);

  sendAllTeachersLocations();

  setInterval(sendAllTeachersLocations, INTERVAL_MS);
}

startSimulator();