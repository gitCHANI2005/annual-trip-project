
import type { Student } from "../../types/student.types";
import '../../styles/Table.css';

interface StudentTableProps {
    students: Student[];
}

function StudentTable({ students }: StudentTableProps) {
    if (students.length === 0) {
        return <p>לא נמצאו תלמידות</p>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>שם פרטי</th>
                    <th>שם משפחה</th>

                    <th>כיתה</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student.id}>   
                        <td>{student.firstname}</td>
                        <td>{student.lastname}</td>
                        <td>{student.classname}</td>        
                    </tr>
                ))}
            </tbody>
        </table>
    );  
}

export default StudentTable;