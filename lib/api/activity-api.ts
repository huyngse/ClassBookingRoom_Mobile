import { axiosClient } from "./config/axios-client";

export const handleApiError = (error: any) => {
  try {
    const errorMessage = error.Errors?.ErrorMessage || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};

export const getAllActivity = async () => {
  try {
    const { data } = await axiosClient.get(`/api/departments/activities`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const getActivitiesByDepartmentId = async (departmentId: number) => {
  try {
    const { data } = await axiosClient.get(`/api/departments/${departmentId}/activities`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const createActivity = async (formData: { code: string; name: string; departmentId: number }) => {
  try {
    const { data } = await axiosClient.post(`/api/departments/activities`, formData);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteActivity = async (id: number) => {
  try {
    const { data } = await axiosClient.delete(`/api/departments/activities/${id}`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
}

export const updateActivity = async (
  id: number,
  formData: {
    code: string;
    name: string;
  }
) => {
  try {
    const { data } = await axiosClient.put(`/api/departments/activities/${id}`, formData);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};