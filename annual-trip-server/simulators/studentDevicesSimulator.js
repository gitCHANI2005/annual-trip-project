// simulator, a file that simulates student devices sending their current location.
//  Every minute, the file simulates the movement and creates a loop that simulates

const SERVER_URL = 'http://localhost:3000/location/student/latest';

const INTERVAL_MS = 6000

const DEVICE_KEY = 'student_device_key_123'

const students = [
  {
    ID: '123123673',
    latitude: 31.7809,
    longitude: 35.2077,
  },
  {
    ID: '435476289',
    latitude: 31.7813,
    longitude: 35.2082,
  },
  {
    ID: '376834657',
    latitude: 31.7804,
    longitude: 35.2071,
  },

  {
    ID: '200000001',
    latitude: 31.7812,
    longitude: 35.2079,
  },
  {
    ID: '200000002',
    latitude: 31.7807,
    longitude: 35.2075,
  },
  {
    ID: '200000003',
    latitude: 31.7820,
    longitude: 35.2085,
  },
  {
    ID: '200000004',
    latitude: 31.7798,
    longitude: 35.2069,
  },
  {
    ID: '200000005',
    latitude: 31.7830,
    longitude: 35.2091,
  },
  {
    ID: '200000006',
    latitude: 31.7789,
    longitude: 35.2062,
  },
  {
    ID: '200000007',
    latitude: 31.7841,
    longitude: 35.2100,
  },
  {
    ID: '200000008',
    latitude: 31.7778,
    longitude: 35.2055,
  },
  {
    ID: '200000009',
    latitude: 31.7850,
    longitude: 35.2112,
  },
  {
    ID: '200000010',
    latitude: 31.7769,
    longitude: 35.2048,
  },
  {
    ID: '200000011',
    latitude: 31.7828,
    longitude: 35.2050,
  },
  {
    ID: '200000012',
    latitude: 31.7795,
    longitude: 35.2110,
  },
  {
    ID: '200000013',
    latitude: 31.7860,
    longitude: 35.2065,
  },

  {
    ID: '200000014',
    latitude: 31.8020,
    longitude: 35.1685,
  },
  {
    ID: '200000015',
    latitude: 31.7480,
    longitude: 35.2180,
  },

  // כיתה ו2 - מורה: 215225673
  {
    ID: '200000016',
    latitude: 31.7816,
    longitude: 35.2085,
  },
  {
    ID: '200000017',
    latitude: 31.7810,
    longitude: 35.2080,
  },
  {
    ID: '200000018',
    latitude: 31.7824,
    longitude: 35.2090,
  },
  {
    ID: '200000019',
    latitude: 31.7802,
    longitude: 35.2074,
  },
  {
    ID: '200000020',
    latitude: 31.7834,
    longitude: 35.2098,
  },
  {
    ID: '200000021',
    latitude: 31.7791,
    longitude: 35.2066,
  },
  {
    ID: '200000022',
    latitude: 31.7845,
    longitude: 35.2105,
  },
  {
    ID: '200000023',
    latitude: 31.7782,
    longitude: 35.2059,
  },
  {
    ID: '200000024',
    latitude: 31.7853,
    longitude: 35.2115,
  },
  {
    ID: '200000025',
    latitude: 31.7772,
    longitude: 35.2050,
  },
  {
    ID: '200000026',
    latitude: 31.7829,
    longitude: 35.2056,
  },
  {
    ID: '200000027',
    latitude: 31.7798,
    longitude: 35.2118,
  },
  {
    ID: '200000028',
    latitude: 31.7862,
    longitude: 35.2070,
  },
  {
    ID: '200000029',
    latitude: 31.7764,
    longitude: 35.2092,
  },
  {
    ID: '200000030',
    latitude: 31.7840,
    longitude: 35.2045,
  },
  {
    ID: '200000031',
    latitude: 31.7780,
    longitude: 35.2122,
  },
  {
    ID: '200000032',
    latitude: 31.7868,
    longitude: 35.2104,
  },
  {
    ID: '200000033',
    latitude: 31.7758,
    longitude: 35.2068,
  },

  {
    ID: '200000034',
    latitude: 31.8040,
    longitude: 35.1690,
  },
  {
    ID: '200000035',
    latitude: 31.7465,
    longitude: 35.2205,
  },

  {
    ID: '200000036',
    latitude: 31.7808,
    longitude: 35.2074,
  },
  {
    ID: '200000037',
    latitude: 31.7802,
    longitude: 35.2070,
  },
  {
    ID: '200000038',
    latitude: 31.7815,
    longitude: 35.2080,
  },
  {
    ID: '200000039',
    latitude: 31.7795,
    longitude: 35.2064,
  },
  {
    ID: '200000040',
    latitude: 31.7825,
    longitude: 35.2088,
  },
  {
    ID: '200000041',
    latitude: 31.7786,
    longitude: 35.2057,
  },
  {
    ID: '200000042',
    latitude: 31.7836,
    longitude: 35.2096,
  },
  {
    ID: '200000043',
    latitude: 31.7775,
    longitude: 35.2050,
  },
  {
    ID: '200000044',
    latitude: 31.7847,
    longitude: 35.2106,
  },
  {
    ID: '200000045',
    latitude: 31.7766,
    longitude: 35.2044,
  },
  {
    ID: '200000046',
    latitude: 31.7823,
    longitude: 35.2048,
  },
  {
    ID: '200000047',
    latitude: 31.7790,
    longitude: 35.2108,
  },
  {
    ID: '200000048',
    latitude: 31.7856,
    longitude: 35.2062,
  },

  {
    ID: '200000049',
    latitude: 31.8030,
    longitude: 35.1680,
  },
  {
    ID: '200000050',
    latitude: 31.7470,
    longitude: 35.2190,
  },
];
// Create a small movement

function moveStudent(student){
    const smallChange = 0.0003;

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

async function sendAllStudentsLocations() {
    console.log('Sending students locations...');

    for (const student of students) {
        await sendStudentLocation(student);
    }

    console.log('Cycle completed\n');
}

function startSimulator() {
  console.log('Student devices simulator started');
  console.log(`Sending updates to: ${SERVER_URL}`);
  console.log(`Interval: ${INTERVAL_MS / 1000} seconds\n`);

  sendAllStudentsLocations();

  setInterval(sendAllStudentsLocations, INTERVAL_MS);
}

startSimulator();