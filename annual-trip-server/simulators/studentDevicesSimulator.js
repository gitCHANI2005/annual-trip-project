const SERVER_URL = 'http://localhost:3000/location/student/latest';

const SEND_EVERY_MS  = 20000
const SPREAD_WINDOW_MS = 18000;

const DEVICE_KEY = 'student_device_key_123'

const students = [
  {
    ID: '123123673',
    latitude: 31.783963,
    longitude: 35.209069,
  },
  {
    ID: '435476289',
    latitude: 31.781860,
    longitude: 35.213540,
  },
  {
    ID: '376834657',
    latitude: 31.775824,
    longitude: 35.212909,
  },
  {
    ID: '200000001',
    latitude: 31.773973,
    longitude: 35.203079,
  },
  {
    ID: '200000002',
    latitude: 31.785955,
    longitude: 35.197703,
  },
  {
    ID: '200000003',
    latitude: 31.788962,
    longitude: 35.216313,
  },
  {
    ID: '200000004',
    latitude: 31.774668,
    longitude: 35.221983,
  },
  {
    ID: '200000005',
    latitude: 31.767036,
    longitude: 35.206373,
  },
  {
    ID: '200000006',
    latitude: 31.778373,
    longitude: 35.190286,
  },
  {
    ID: '200000007',
    latitude: 31.795426,
    longitude: 35.198331,
  },
  {
    ID: '200000008',
    latitude: 31.798748,
    longitude: 35.211498,
  },
  {
    ID: '200000009',
    latitude: 31.777731,
    longitude: 35.230270,
  },
  {
    ID: '200000010',
    latitude: 31.760545,
    longitude: 35.214797,
  },
  {
    ID: '200000011',
    latitude: 31.769963,
    longitude: 35.184350,
  },
  {
    ID: '200000012',
    latitude: 31.803236,
    longitude: 35.222902,
  },

  {
    ID: '200000013',
    latitude: 31.805087,
    longitude: 35.219375,
  },
  {
    ID: '200000014',
    latitude: 31.756026,
    longitude: 35.218493,
  },

  {
    ID: '200000015',
    latitude: 31.788112,
    longitude: 35.176578,
  },

  {
    ID: '200000016',
    latitude: 31.784881,
    longitude: 35.209397,
  },
  {
    ID: '200000017',
    latitude: 31.783249,
    longitude: 35.214275,
  },
  {
    ID: '200000018',
    latitude: 31.777266,
    longitude: 35.215245,
  },
  {
    ID: '200000019',
    latitude: 31.772391,
    longitude: 35.208300,
  },
  {
    ID: '200000020',
    latitude: 31.776731,
    longitude: 35.197787,
  },
  {
    ID: '200000021',
    latitude: 31.787255,
    longitude: 35.196442,
  },
  {
    ID: '200000022',
    latitude: 31.793067,
    longitude: 35.217757,
  },
  {
    ID: '200000023',
    latitude: 31.779034,
    longitude: 35.224943,
  },
  {
    ID: '200000024',
    latitude: 31.765652,
    longitude: 35.214972,
  },
  {
    ID: '200000025',
    latitude: 31.764306,
    longitude: 35.197287,
  },
  {
    ID: '200000026',
    latitude: 31.785211,
    longitude: 35.186984,
  },
  {
    ID: '200000027',
    latitude: 31.799248,
    longitude: 35.194829,
  },
  {
    ID: '200000028',
    latitude: 31.795007,
    longitude: 35.228576,
  },
  {
    ID: '200000029',
    latitude: 31.772136,
    longitude: 35.232082,
  },
  {
    ID: '200000030',
    latitude: 31.757527,
    longitude: 35.216573,
  },
  {
    ID: '200000031',
    latitude: 31.758343,
    longitude: 35.193245,
  },

  {
    ID: '200000032',
    latitude: 31.794249,
    longitude: 35.180559,
  },
  {
    ID: '200000033',
    latitude: 31.806374,
    longitude: 35.218993,
  },

  {
    ID: '200000034',
    latitude: 31.760558,
    longitude: 35.228873,
  },
  {
    ID: '200000035',
    latitude: 31.776582,
    longitude: 35.176154,
  },

  {
    ID: '200000036',
    latitude: 31.784274,
    longitude: 35.209215,
  },
  {
    ID: '200000037',
    latitude: 31.781150,
    longitude: 35.214590,
  },
  {
    ID: '200000038',
    latitude: 31.773589,
    longitude: 35.212975,
  },
  {
    ID: '200000039',
    latitude: 31.770841,
    longitude: 35.200830,
  },
  {
    ID: '200000040',
    latitude: 31.778346,
    longitude: 35.192213,
  },
  {
    ID: '200000041',
    latitude: 31.792289,
    longitude: 35.196750,
  },
  {
    ID: '200000042',
    latitude: 31.794064,
    longitude: 35.221969,
  },
  {
    ID: '200000043',
    latitude: 31.777237,
    longitude: 35.229865,
  },
  {
    ID: '200000044',
    latitude: 31.759443,
    longitude: 35.218521,
  },
  {
    ID: '200000045',
    latitude: 31.761483,
    longitude: 35.191507,
  },
  {
    ID: '200000046',
    latitude: 31.785969,
    longitude: 35.178719,
  },

  {
    ID: '200000047',
    latitude: 31.806287,
    longitude: 35.201355,
  },
  {
    ID: '200000048',
    latitude: 31.793888,
    longitude: 35.234275,
  },

  {
    ID: '200000049',
    latitude: 31.753303,
    longitude: 35.207200,
  },

  {
    ID: '200000050',
    latitude: 31.791411,
    longitude: 35.185173,
  },
];
// Create a small movement

function moveStudent(student){
    const smallChange = 0.001;

    student.latitude += (Math.random() - 0.5) * smallChange;
    student.longitude += (Math.random() - 0.5) * smallChange;
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


function buildRequestBody(student){
    return{
        ID: student.ID,
        Coordinates: {
        Longitude: decimalToDms(student.longitude),
        Latitude: decimalToDms(student.latitude),
        },
        Time: new Date().toISOString(),
    };
}

async function sendStudentLocation(student){
    moveStudent(student);

    const body = buildRequestBody(student);

    try {
        const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-device-key': DEVICE_KEY,
        },
        body: JSON.stringify(body),
        });

        const data = await response.json().catch(() =>  null);

        if (!response.ok) {
        console.log(`Failed to update student ${student.ID}`);
        console.log('Status:', response.status);
        console.log('Response:', data);
        return;
        }

        console.log(`Updated student ${student.ID}`, body);
    } catch (error) {
        console.log(`Error while updating student ${student.ID}`);
        console.log(error.message);
    }
}

function startSimulator() {
  console.log('Student devices simulator started');
  console.log(`Sending updates to: ${SERVER_URL}`);
  console.log(`Each student sends every: ${SEND_EVERY_MS / 1000} seconds`);
  console.log(`Students are spread over: ${SPREAD_WINDOW_MS / 1000} seconds\n`);

  const delayBetweenStudents = SPREAD_WINDOW_MS / students.length;

  students.forEach((student, index) => {
    const initialDelay = index * delayBetweenStudents;

    setTimeout(() => {
      sendStudentLocation(student);

      setInterval(() => {
        sendStudentLocation(student);
      }, SEND_EVERY_MS);
    }, initialDelay);
  });
}


startSimulator();