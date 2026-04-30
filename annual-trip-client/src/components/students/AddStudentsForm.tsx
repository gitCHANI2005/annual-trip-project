// טופס הוספת תלמידה חדשה

import { useState } from "react";
import type { Student } from "../../types/student.types";
import { addStudent } from "../../api/teacherApi";

interface AddStudentFormProps {
  onStudentAdded: (student: Student) => void;
}

function AddStudentForm({ onStudentAdded }: AddStudentFormProps) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [id, setId] = useState("");
  const [classname, setClassname] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!firstname || !lastname || !classname || !id) {
      setMessage("יש למלא את כל השדות");
      return;
    }

    try {
      const studentData: Student = {
        id,
        firstname,
        lastname,
        classname,
      };

      const newStudent = await addStudent(studentData);

      onStudentAdded(newStudent);

      setFirstname("");
      setLastname("");
      setId("");
      setClassname("");

      setMessage("התלמידה נוספה בהצלחה");
    } catch (error) {
      console.error("Error adding student:", error);
      setMessage("שגיאה בהוספת התלמידה");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h2>הוספת תלמידה חדשה</h2>

      {message && <p className="form-message">{message}</p>}

      <input
        type="text"
        placeholder="שם פרטי"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />

      <input
        type="text"
        placeholder="שם משפחה"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />

      <input
        type="text"
        placeholder="תעודת זהות"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <input
        type="text"
        placeholder="כיתה"
        value={classname}
        onChange={(e) => setClassname(e.target.value)}
      />

      <button type="submit" className="btn btn-outline-success mt-3 custom-outline-button dashboard-button">
        הוסף תלמידה
      </button>
    </form>
  );
}

export default AddStudentForm;