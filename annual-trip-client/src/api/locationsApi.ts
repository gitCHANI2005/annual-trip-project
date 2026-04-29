import api from "./axiosClient";
import type { TeacherMapResponse } from "../types/map.types";

export async function getTeacherMap(): Promise<TeacherMapResponse> {
    const response = await api.get<TeacherMapResponse>('/teacher/map');
    return response.data;
}   