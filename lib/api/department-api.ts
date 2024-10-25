import { axiosClient } from "./config/axios-client";

export const handleApiError = (error: any) => {
    try {
        const errorMessage = error.Errors?.ErrorMessage || 'An unexpected error occurred.';
        const data = null;
        return { error: errorMessage, data };
    } catch (err) {
        throw new Error('An unexpected error occurred.');
    }
};

export const getAllDepartments = async () => {
    try {
        const { data } = await axiosClient.get(`/api/departments`);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}

export const getDepartmentById = async (id: number) => {
    try {
        const { data } = await axiosClient.get(`/api/departments/${id}`);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}
export const createDepartment = async (formData: {
    name: string,
}) => {
    try {
        const { data } = await axiosClient.post(`/api/departments`, formData);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}

export const updateDepartment = async (id: number, formData: {
    name: string,
}) => {
    try {
        const { data } = await axiosClient.put(`/api/departments/${id}`, formData);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}
export const deleteDepartment = async (id: number) => {
    try {
        const { data } = await axiosClient.delete(`/api/departments/${id}`);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}