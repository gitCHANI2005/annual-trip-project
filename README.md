# מערכת לניהול טיול שנתי

הפרויקט הוא מערכת לניהול טיול שנתי עבור בית הספר "בנות משה".  
המערכת מאפשרת רישום תלמידות ומורות, שליפת נתונים לפי הרשאות, הצגת מיקומי המורה והתלמידות, וזיהוי תלמידות שהתרחקו מהמורה.

## תיאור הפרויקט

הפרויקט הוא מערכת לניהול טיול שנתי עבור בית הספר "בנות משה", המערכת מאפשרת רישום תלמידות ומורות וכן שליפות שונות ביניהם הצגת תלמידות והצגת מיקומי המורה והתלמידות וזיהוי תלמידות רחוקות בהתאם להרשאות.

## יכולות עיקריות

### מנהלת
- התחברות.
- הצגת רשימת תלמידות.
- הצגת רשימת מורות.
- הוספת מורה חדשה.

### מורה
- התחברות למערכת.
- הצגת תלמידות הכיתה שלה.
- הוספת תלמידה חדשה.
- צפייה במפה המציגה את מיקום המורה והתלמידות בזמן אמת.
- קבלת אזהרה עבור תלמידות שהתרחקו מעל 3 ק״מ מהמורה.

## טכנולוגיות

### צד לקוח

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-663399?style=for-the-badge&logo=css&logoColor=white)
![Google Maps](https://img.shields.io/badge/Google%20Maps-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)
![Socket.IO Client](https://img.shields.io/badge/Socket.IO_Client-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

### צד שרת

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### כלי פיתוח ובדיקה

![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

## שיקולי בחירת טכנולוגיות

- בחרתי ב־React כי צד הלקוח כולל כמה אזורים דינמיים כמו טפסים, טבלאות, דשבורדים ומפה. החלוקה לרכיבים עזרה לי לשמור על קוד מסודר וברור.
- בחרתי ב־Node.js ו־Express כי רציתי לבנות API פשוט וברור, עם הפרדה בין routes, controllers ו־middlewares.
- בחרתי ב־PostgreSQL כי הנתונים במערכת הם רלציוניים: מורות, תלמידות, כיתות ומיקומים. לכן מסד נתונים טבלאי מתאים כאן יותר ממבנה לא רלציוני.
- בחרתי ב־Socket.IO אחרי שבתחילת הפיתוח בדקתי אפשרות של Polling. המעבר ל־WebSocket איפשר לעדכן את המפה רק כאשר מתקבל מיקום חדש, במקום לשלוח בקשות חוזרות מהלקוח.

## מבנה הפרויקט

```txt
annual-trip/
│
├── annual-trip-client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── socket.ts
│   │
│   └── package.json
│
├── annual-trip-server/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── routes/
│   ├── simulators/
│   ├── utils/
│   ├── app.js
│   └── package.json
│
└── README.md
``` 

## מבנה הנתונים וקשרי גומלין

המערכת מבוססת על ארבע טבלאות מרכזיות במסד הנתונים:

- `teachers` - שמירת פרטי המורות, כולל מזהה, שם, סיסמה מוצפנת וכיתה.
- `students` - שמירת פרטי התלמידות, כולל מזהה, שם וכיתה.
- `teacherlatestlocations` - שמירת המיקום האחרון של כל מורה.
- `studentlatestlocations` - שמירת המיקום האחרון של כל תלמידה.

הקישור בין מורה לתלמידות מתבצע לפי שדה `classname`.
כל מורה רואה את התלמידות המשויכות לאותה כיתה שלה.

המיקום האחרון של מורה נשמר בטבלה נפרדת כדי להפריד בין פרטי המורה לבין נתוני המיקום.
גם המיקום האחרון של תלמידה נשמר בטבלה נפרדת כדי לאפשר עדכון מיקום בלי לשנות את פרטי התלמידה עצמה.

התחברות מנהלת מתבצעת לפי פרטי התחברות המוגדרים בקובץ `.env`, ולכן מנהלת אינה נשמרת כטבלה נפרדת במסד הנתונים.

## הרצת צד השרת

יש להיכנס תיקיית השרת:

```bash
cd annual-trip-server
```

להתקין תלויות:
``` bash
npm install
```

להפעיל צד שרת:
``` bash
npm run dev
```
השרת ירוץ בכתובת:
http://localhost:3000

## הרצת צד הלקוח

יש להיכנס לתיקיית הלקוח:

```bash
cd annual-trip-client
```

להתקין תלויות:
``` bash
npm install
```

להפעיל צד לקוח:
``` bash
npm run dev
```

המערכת תפתח בכתובת:
http://localhost:5173

## סימולטור מיקומים

לצורך בדיקת מערכת המיקומים נכתב סימולטור המדמה שליחת מיקומים של מורות ותלמידות לשרת.

הסימולטור מאפשר לבדוק את עדכון המיקומים, את הצגת הנתונים על המפה, את עדכוני ה־WebSocket ואת מנגנון זיהוי התלמידות שהתרחקו מהמורה.

יש להריץ כל סימולטור בטרמינל נפרד:
בטרמינל ראשון:

```bash
cd annual-trip-server
node simulators/teacherDevicesSimlator.js
```

ובטרמינל נוסף:
```bash
cd annual-trip-server
node simulators/studentDevicesSimulator.js
```

## משתני סביבה
בתיקיית השרת יש ליצור קובץ `.env` עם הערכים הבאים:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=annual_trip_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password

PORT=3000
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=admin_user_name
ADMIN_PASSWORD=admin_password

STUDENT_DEVICE_KEY=your_student_device_key
TEACHER_DEVICE_KEY=your_teacher_device_key
```

בנוסף, יש ליצור קובץ .env בתיקיית הלקוח:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## API מרכזיים

כל הבקשות יוצאות דרך `axiosClient`, עם כתובת בסיס:
`http://localhost:3000`

בנוסף, אם קיים token, הוא נשלח אוטומטית ב־Header:
`Authorization: Bearer <token>`

בקשות עדכון מיקום ממכשירים נשלחות עם Header נוסף:
`X-Device-Key: <device_key>`

### התחברות

| Method | Route | Description |
|---|---|---|
| POST | `/auth/login` | התחברות למערכת - מנהל או מורה |

### ניהול מנהל

| Method | Route | Description |
|---|---|---|
| GET | `/admin/teachers` | שליפת כל המורות |
| GET | `/admin/students` | שליפת כל התלמידות |
| POST | `/admin/teacher` | הוספת מורה חדשה |

### פעולות מורה

| Method | Route | Description |
|---|---|---|
| GET | `/teacher/students` | שליפת תלמידות הכיתה של המורה |
| GET | `/teacher/students/:id` | שליפת תלמידה לפי מזהה |
| POST | `/teacher/student` | הוספת תלמידה חדשה |

### מפה ומיקומים

| Method | Route | Description |
|---|---|---|
| GET | `/teacher/map` | שליפת המורה ותלמידות הכיתה שלה עם המיקומים |

### עדכון מיקומים

| Method | Route | Description |
|---|---|---|
| POST | `/location/student/latest` | עדכון מיקום אחרון של תלמידה |
| POST | `/location/teacher/latest` | עדכון מיקום אחרון של מורה |

## צילומי מסך

### מסך התחברות
![מסך התחברות](./screenshots/login.png)

### לוח מנהלת
![לוח מנהלת](./screenshots/admin-dashboard.png)

### הוספת מורה
![הוספת מורה](./screenshots/add-teacher.png)

### לוח מורה
![לוח מורה](./screenshots/teacher-dashboard.png)

### הוספת תלמידה
![הוספת תלמידה](./screenshots/add-student.png)

### מפת מיקומים
![מפת מיקומים](./screenshots/map.png)

## ולידציות ואבטחה

- המערכת מבצעת בדיקות תקינות לשדות חובה בטפסים.
- מספר תעודת זהות נבדק כדי לוודא שהוא מכיל 9 ספרות.
- פעולות ניהול ומורה מוגנות באמצעות JWT.
- בקשות עדכון מיקום ממכשירי תלמידות ומורות מוגנות באמצעות device key.
- הטוקן נשלח מהלקוח לשרת באמצעות Authorization Header.

## הנחות והחלטות תכנון

### הנחות
- כל מורה משויכת לכיתה אחת.
- ייתכן שמספר מורות יהיו משויכות לאותה כיתה, ולכן הקישור בין מורה לתלמידות מתבצע לפי שם הכיתה ולא לפי מזהה מורה.
- כל תלמידה משויכת לכיתה אחת.
- נשמר המיקום האחרון בלבד של כל תלמידה ומורה, ולא היסטוריית מיקומים מלאה.
- תלמידה נחשבת רחוקה מדי אם המרחק האווירי בינה לבין המורה גדול מ־3 ק״מ.
- לא מומשו פעולות עריכה ומחיקה, בהתאם לדרישת התרגיל שכללה שליפה והכנסה בלבד.

### החלטות תכנון
- הפרויקט חולק לצד לקוח וצד שרת כדי להפריד בין ממשק המשתמש לבין הלוגיקה העסקית ושמירת הנתונים.
- בצד השרת נעשתה הפרדה בין routes, controllers, middlewares ו־utils כדי לשמור על קוד מסודר וקל לתחזוקה.
- המיקומים נשמרים בטבלה/מבנה נפרד כדי להפריד בין נתוני משתמשים קבועים לבין נתוני מיקום שמשתנים בתדירות גבוהה.
- WebSocket נבחר עבור עדכוני מיקום כדי לאפשר לשרת לדחוף עדכונים ללקוח כאשר מתקבל מיקום חדש.
- בתחילת הפיתוח נבדקה אפשרות של Polling לעדכון המפה, אך בהמשך הוחלט לעבור ל־WebSocket כדי לאפשר עדכון מיידי יותר של המיקומים ולמנוע בקשות חוזרות מהלקוח כאשר אין שינוי בנתונים.
- חישוב המרחק בין המורה לתלמידות מתבצע באמצעות נוסחת Haversine, המתאימה לחישוב מרחק אווירי בין שתי נקודות לפי קווי אורך ורוחב.

## רעיונות לשיפור עתידי

- הוספת מנגנון התראה עבור תלמידה שאמורה להשתתף בטיול אך המכשיר שלה אינו פעיל או לא שלח מיקום במשך זמן מסוים.  
  כיום תלמידה ללא מיקום עדכני לא תוצג על המפה, ולכן המורה לא בהכרח תדע שיש תלמידה שחסר עבורה מידע.  
  בעתיד ניתן לבדוק את זמן שליחת המיקום האחרון (`locationtime`) ולהציג למורה התראה אם עבר זמן רב מאז העדכון האחרון.

- הוספת אפשרות לחישוב מסלול הליכה קצר אל תלמידה שהתרחקה מהמורה.  
  כיום המערכת מזהה תלמידות שנמצאות במרחק של יותר מ־3 ק״מ מהמורה, אך אינה מציגה דרך הגעה אליהן.  
  בעתיד ניתן להוסיף כפתור ליד כל תלמידה רחוקה, שיחשב ויציג את מסלול ההליכה הקצר ביותר מהמיקום הנוכחי של המורה אל מיקום התלמידה, באמצעות גוגל מפות.

## יוצרת הפרויקט

**חני פיינהנדלר**  
GitHub: https://github.com/gitCHANI2005