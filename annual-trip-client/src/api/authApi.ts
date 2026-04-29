// endpoint login

import api from "./axiosClient";

import type { LoginRequest, LoginResponse } from '../types/auth.types';

export const login = async (
    loginData: LoginRequest
): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', loginData);
    return response.data;
};