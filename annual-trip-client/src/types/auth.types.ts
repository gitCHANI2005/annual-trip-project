export type UserRole = 'admin' | 'teacher';

export type AdminLoginRequest = {
    username: string;
    password: string;
};

export type TeacherLoginRequest = {
    id: string;
    password: string;
};

export type LoginRequest = AdminLoginRequest | TeacherLoginRequest;

export type AdminUser = {
    role: 'admin';
    username: string;
}

export type TeacherUser = {
    role: 'teacher'
    id: string;
    firstname: string;
    lastname: string;
    classname: string;
    password: string;
}

export type LoggedInUser = AdminUser | TeacherUser;

export type LoginResponse = {
    message: string;
    token: string;
    user: LoggedInUser;
};