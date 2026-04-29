// GET /admin/teachers

// GET /admin/students

// POST /admin/teachers

import api from "./axiosClient";    
import type { Student } from '../types/student.types';

import type { Teacher, CreateTeacherRequest, TeacherResponse } from '../types/teacher.types';

export const getTeachers = async (): Promise<Teacher[]> => {
    const response = await api.get<Teacher[]>('/admin/teachers');
    return response.data;
};

export const getStudents = async (): Promise<Student[]> => {
    const response = await api.get<Student[]>('/admin/students');
    return response.data;
};

export const addTeacher = async (teacherData: CreateTeacherRequest
    ): Promise<Teacher> => {
    const response = await api.post<TeacherResponse>('/admin/teacher', teacherData);
    return response.data.teacher;
};