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

export const getAllRoomType = async () => {
    try {
        const { data } = await axiosClient.get(`/api/room-types`);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}

export const getRoomTypeById = async (id: number) => {
    try {
        const { data } = await axiosClient.get(`/api/room-types/${id}`);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}
export const createRoomType = async (formData: {
    name: string,
    // departmentId: number
}) => {
    try {
        const { data } = await axiosClient.post(`/api/room-types`, formData);
        
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}

export const updateRoomType = async (id: number, formData: {
    name: string,
}) => {
    try {
        const { data } = await axiosClient.put(`/api/room-types/${id}`, formData);

        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}
export const deleteRoomType = async (id: number) => {
    try {
        const { data } = await axiosClient.delete(`/api/room-types/${id}`);

        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}

export const addCohort = async (roomTypeId: number, cohortId: number) => {
    console.log(`/api/room-types/${roomTypeId}/cohort`);
    console.log(cohortId)
    try {
        const { data } = await axiosClient.put(`/api/room-types/${roomTypeId}/cohort`, cohortId);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}
export const removeCohort = async (roomTypeId: number, cohortId: number) => {
    try {
        const { data } = await axiosClient.delete(`/api/room-types/${roomTypeId}/cohort?cohortId=${cohortId}`);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}