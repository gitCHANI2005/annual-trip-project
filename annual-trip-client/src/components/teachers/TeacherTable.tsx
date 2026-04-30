import '../../styles/Table.css';

import type { Teacher } from "../../types/teacher.types";

interface TeacherTableProps {
    teachers: Teacher[];
}

function TeacherTable({ teachers }: TeacherTableProps) {
    if (teachers.length === 0) {
        return <p>לא נמצאו מורות</p>;
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
                {teachers.map((teacher) => (
                    <tr key={teacher.id}>
                        <td>{teacher.firstname}</td>
                        <td>{teacher.lastname}</td>
                        <td>{teacher.classname}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TeacherTable;