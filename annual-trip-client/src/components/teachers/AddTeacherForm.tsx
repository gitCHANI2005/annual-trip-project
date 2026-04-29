import { useState } from "react";
import type {  Teacher } from "../../types/teacher.types";
import { addTeacher } from "../../api/adminApi";
import '../../styles/Form.css'
interface AddTeacherFormProps {
    onTeacherAdded: (teacher: Teacher) => void;
}

function AddTeacherForm({ onTeacherAdded }: AddTeacherFormProps) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [id, setId] = useState('');   
    const [password, setPassword] = useState('');
    const [classname, setClassname] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        if (!firstname || !lastname || !classname || !password || !id) {
            setMessage('יש למלא את כל השדות');
            return;
        }

        try {
            const newTeacher = await addTeacher({ id, firstname, lastname, classname, password });
            onTeacherAdded(newTeacher);
            setFirstname('');
            setLastname('');
            setId('');
            setClassname('');
            setPassword('');
            setMessage('המורה נוספה בהצלחה');
        }
        catch (error) {
            console.error('Error adding teacher:', error);
            setMessage('שגיאה בהוספת המורה');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-form">
            <h2>הוספת מורה חדש</h2>
            {message && <p className="form-message">{message}</p>}            <input
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
            <input
                type="password"
                placeholder="סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submit-button">הוסף מורה</button>     
        </form>
    );
}   

export default AddTeacherForm;