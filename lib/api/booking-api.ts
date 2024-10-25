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

export const createBooking = async (request: {
    userId: string,
    activityId: number,
    description: string,
    roomSlots: number[]
}) => {
    try {
        const { data } = await axiosClient.post(`/api/bookings`, { ...request, status: "Pending" });
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}