export const handleApiError = (error: any) => {
    try {
        const errorMessage = error.Errors?.ErrorMessage || 'An unexpected error occurred.';
        const data = null;
        return { error: errorMessage, data };
    } catch (err) {
        throw new Error('An unexpected error occurred.');
    }
};

export const mockLogin = async (role: "manager" | "admin") => {
    const response: any = { error: null, data: null, success: false }

    try {
        var data: any;
        if (role == "admin") {
            data = {
                role: "admin"
            }
        } else if (role == "manager") {
            data = {
                role: "manager"
            }
        } else {
            data.Errors = "Invalid role"
        }
        if (data && data.Errors) {
            response.error = data.Errors
        } else {
            response.data = data;
            response.success = true;
        }
        return response;
    } catch (error) {
        return handleApiError(error);
    }
}
