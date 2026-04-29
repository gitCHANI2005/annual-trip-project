import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {login } from "../../api/authApi";
import { setToken } from "../../services/tokenService";
import type { LoginRequest } from "../../types/auth.types";
import BackButton from "../../components/common/BackButton";

const LoginPage = () => {
    const [loginType, setLoginType] = useState<'admin' | 'teacher'>('teacher');
    const [username, setUsername] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setMessage('');
        if (!password){
            setMessage('יש למלא סיסמה');
            return;
        }

        if( loginType === 'admin'  && !username){
            setMessage('יש למלא שם משתמש');
            return;
        }
        if( loginType === 'teacher'  && !id){
            setMessage('יש למלא תעודת זהות');
            return;
        }  
        const loginData: LoginRequest = loginType === 'admin'
            ? { username, password }
            : { id, password };
            setLoading(true);
        try {
            const response = await login(loginData);
            setToken(response.token);

            if (response.user.role === 'admin') {
                navigate('/admin-dashboard');
            } else  if (response.user.role === 'teacher') {
                navigate('/teacher-dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('שם משתמש או סיסמה שגויים');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className ="login-container">
            <BackButton />
                <h2>התחברות</h2>
                <div className="login-type">
                    <label>
                        <input
                            type="radio"
                            name="loginType"
                            value="teacher"
                            checked={loginType === 'teacher'}
                            onChange={() => setLoginType('teacher')}
                        />
                        מורה
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="loginType"
                            value="admin"
                            checked={loginType === 'admin'}
                            onChange={() => setLoginType('admin')}
                        />
                        מנהל
                    </label>
                </div>
                {loginType === 'admin' ? (
                    <input
                        type="text"
                        name="adminLoginName"
                        placeholder="שם משתמש"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}   
                        autoComplete="off"    
                />  ) : (
                    <input
                        type="text"
                        name="teacherLoginId"
                        placeholder="תעודת זהות"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        autoComplete="off"
                    />
                )}
                <input
                    type="password"
                    name="loginPassword"
                    placeholder="סיסמה"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                />
                <button onClick={handleLogin} disabled={loading}>
                    {loading ? 'מתחבר...' : 'התחבר'}
                </button>
                {message && <p>{message}</p>}
        </div>
    );
};

export default LoginPage;