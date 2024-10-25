import { User } from "@/types/user";
import { axiosClient } from "./config/axios-client";

export const handleApiError = (error: any) => {
  try {
    const errorMessage = error?.Errors?.ErrorMessage || error.message || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await axiosClient.get(`/api/users?PageSize=999`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const getUnverifiedUsers = async () => {
  try {
    const { data } = await axiosClient.get(`/api/users?PageSize=999`);

    const unverifiedUsers = data.filter((user: User) => user.isVerify === false);
    return { error: null, data: unverifiedUsers, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const { data } = await axiosClient.get(`/api/user/${id}`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const createUser = async (formData: { fullName: string; email: string; password: string; role: string }) => {
  try {
    const { data } = await axiosClient.post(`/api/users`, formData);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateUser = async (
  id: string,
  formData: {
    firstName: string;
    lastName: string;
    role: string;
    profileImageURL: string;
    status: string;
    departmentId: number;
    cohortId: number;
  }
) => {
  try {
    const { data } = await axiosClient.put(`/api/user/${id}`, formData);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const { data } = await axiosClient.delete(`/api/users/${id}`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const fillUserInfo = async (id: string, departmentId: number, cohortId: number) => {
  try {
    const { data } = await axiosClient.put(`/api/users/${id}/department-cohort`, {
      departmentId: departmentId,
      cohortId: cohortId,
    });
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getUserFace = async (id: string) => {
  try {
    const { data } = await axiosClient.get(`/api/users/${id}/face`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getAllFaces = async () => {
  try {
    const { data } = await axiosClient.get(`/api/users/face`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
}

export const createUserFace = async (userId: string, descriptor: number[]) => {
  try {
    const { data } = await axiosClient.post(`/api/users/face`, {
      userId: userId,
      descriptor: descriptor,
      imageURL: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
    });
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const changeUserStatus = async (id: string, status: string, note: string) => {
  try {
    const { data } = await axiosClient.put(`/api/users/${id}/status`, {
      status: status,
      note: note,
    });
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
}

export const updateUserFace = async (faceId: number, descriptor: number[]) => {
  try {
    const { data } = await axiosClient.put(`/api/users/face/${faceId}`, {
      descriptor: descriptor,
      imageURL: "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
    });
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const sendVerificationEmail = async (userId: string) => {
  try {
    const { data } = await axiosClient.post(`/api/auth/${userId}/send-verification-email`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
