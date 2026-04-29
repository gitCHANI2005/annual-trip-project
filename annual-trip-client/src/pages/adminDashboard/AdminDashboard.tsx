import { useEffect, useState } from "react";
import { getTeachers } from "../../api/adminApi";
import { getStudents } from "../../api/adminApi";
import type { Teacher } from "../../types/teacher.types";
import type { Student } from "../../types/student.types";
import TeacherTable from "../../components/teachers/TeacherTable";
import StudentTable from "../../components/students/StudentTable";
import AddTeacherForm from "../../components/teachers/AddTeacherForm";
import BackButton from "../../components/common/BackButton";

function AdminDashboard() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [students, setStudents] = useState<Student[]>([]);  
    const [showAddTeacher, setShowAddTeacher] = useState(false);
    const [showTeachers, setShowTeachers] = useState(true);
    const [activeSection, setActiveSection] = useState<
    "teachers" | "addTeacher" | "students" | null
    >(null);
    const handleTeacherAdded = (teacher: Teacher) => {
    setTeachers((prevTeachers) => [...prevTeachers, teacher]);
    setActiveSection("teachers");
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const teachersData = await getTeachers();
                console.log("teachers:", teachersData);
                setTeachers(teachersData);
                const studentsData = await getStudents();
                console.log("students:", studentsData);
                setStudents(studentsData);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

return (
    <div>
        <BackButton />

        <h1>לוח בקרה למנהלת</h1>

        <div className="admin-actions">
        <button
            onClick={() =>
            setActiveSection(activeSection === "addTeacher" ? null : "addTeacher")
            }
        >
            הוספת מורה
        </button>

        <button
            onClick={() =>
            setActiveSection(activeSection === "teachers" ? null : "teachers")
            }
        >
            הצגת מורות
        </button>

        <button
            onClick={() =>
            setActiveSection(activeSection === "students" ? null : "students")
            }
        >
            הצגת תלמידות
        </button>
        </div>

        {activeSection === "addTeacher" && (
        <>
            <h2>הוספת מורה</h2>
            <AddTeacherForm onTeacherAdded={handleTeacherAdded} />
        </>
        )}

        {activeSection === "teachers" && (
        <>
            <h2>מורות</h2>
            <TeacherTable teachers={teachers} />
        </>
        )}

        {activeSection === "students" && (
        <>
            <h2>תלמידות</h2>
            <StudentTable students={students} />
        </>
        )}
    </div>
    );
}

export default AdminDashboard;