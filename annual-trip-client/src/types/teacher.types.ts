// type teacher

export type Teacher = {
    id: string;
    firstname: string;
    lastname: string;
    classname: string;
}

export type TeacherResponse = {
    message: string;
    teacher: Teacher;
}

export type CreateTeacherRequest = {
    id: string;
    firstname: string;
    lastname: string;   
    classname: string;
    password: string;
}