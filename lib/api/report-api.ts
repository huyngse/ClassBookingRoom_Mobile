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

export const getAllReports = async () => {
  try {
    const { data } = await axiosClient.get(`/api/reports`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const deleteReport = async (id: number) => {
  try {
    const { data } = await axiosClient.delete(`/api/reports/${id}`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const updateReport = async (
  id: number,
  formData: {
    status: string;
  }
) => {
  try {
    const { data } = await axiosClient.put(`/api/reports/${id}`, formData);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const approveReport = async (id: number) => {
  try {
    const { data } = await axiosClient.put(`/api/reports/${id}/accept`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const denyReport = async (id: number, reason: string) => {
  try {
    // Gửi chuỗi lý do từ chối trực tiếp, không phải là một đối tượng JSON
    const { data } = await axiosClient.put(`/api/reports/${id}/deny`, reason, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getReportById = async (id: number) => {
  try {
    const { data } = await axiosClient.get(`/api/users/${id}/reports`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
