import { User } from "@/types/user";
import { axiosClient } from "./config/axios-client";

export const handleApiError = (error: any) => {
  try {
    const errorMessage = error?.message || error?.response?.data.error || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};

export const loginEmail = async (email: string, password: string) => {
  try {
    const { data } = await axiosClient.post(`/api/auth/login`, { email: email, password: password });

    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const loginGoogle = async (role: string, accessToken: string) => {
  try {
    const { data } = await axiosClient.post(`/api/auth/login-google`, { role: role, accessToken: accessToken });

    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const checkToken = async () => {
  try {
    const { data }: { data?: User } = await axiosClient.get(`/api/auth/token`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const sendVerifycationEmail = async (userId: string) => {
  try {
    const { data } = await axiosClient.post(`/api/auth/${userId}/send-verification-email`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const verifyUser = async (userId: string, otpCode: string) => {
  try {
    const { data } = await axiosClient.post(`/api/auth/${userId}/verify`, otpCode);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
