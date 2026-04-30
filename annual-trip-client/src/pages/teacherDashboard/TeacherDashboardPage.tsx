import { useEffect, useState } from "react";
import { getStudents } from "../../api/teacherApi";
import type { Student } from "../../types/student.types";
import StudentTable from "../../components/students/StudentTable";
import StudentSearch from "../../components/students/StudentSearch";
import AddStudentForm from "../../components/students/AddStudentsForm";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton";

function TeacherDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState<"students" | "addStudent" | null>(null);  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleStudentAdded = (student: Student) => {
    setStudents((prevStudents) => [...prevStudents, student]);
  };

  const filteredStudents = students.filter((student) =>
    `${student.firstname} ${student.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
    <BackButton />
        <h1>אזור ניהול מורה</h1>

        <div className="teacher-actions">
        <button className="btn btn-outline-success mt-3 custom-outline-button dashboard-button"
                onClick={() => 
                setActiveSection(activeSection === "students" ? null : "students")
        }>
            הצגת תלמידות
        </button>

        <button className="btn btn-outline-success mt-3 custom-outline-button dashboard-button"
                onClick={() => 
            setActiveSection(activeSection === "addStudent" ? null : "addStudent")}>
            הוספת תלמידה
        </button>

        <button className="btn btn-outline-success mt-3 custom-outline-button dashboard-button"
                onClick={() => navigate("/teacher/map")}>
            מפה
        </button>
        </div>

        {activeSection === "addStudent"  && (
            <>
            <h2>הוספת תלמידה</h2>
            <AddStudentForm onStudentAdded={handleStudentAdded} />
            </>
        )}

        {activeSection === "students" && (
            <>
                <h2>תלמידות הכיתה</h2>
                <StudentSearch onSearch={setSearchTerm} />
                <StudentTable students={filteredStudents} />
            </>
        )}

    </div>
  );
}

export default TeacherDashboard;