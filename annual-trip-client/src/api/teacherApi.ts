// GET / STUDENTS
// GET / STUDENTS /: ID
// POST / STUDENT

import api from "./axiosClient";

import type { Student } from '../types/student.types';

export const getStudents = async (): Promise<Student[]> => {
    const response = await api.get<Student[]>('/teacher/students');
    return response.data;
}

export const getStudentById = async (id: string): Promise<Student> => {
    const response = await api.get<Student>(`/teacher/students/${id}`);
    return response.data;
}

export const addStudent = async (
  studentData: Student
): Promise<Student> => {
  const response = await api.post("/teacher/student", studentData);
  return response.data.student;
};