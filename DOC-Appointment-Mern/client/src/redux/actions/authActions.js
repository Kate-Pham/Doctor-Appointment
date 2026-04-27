import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../api/API'

//LOGIN
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkApi) => {
        try {
            const res = await API.post("http://localhost:8080/api/v1/user/login", { email, password });
            localStorage.setItem("appData", JSON.stringify(res?.data));
            return res?.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "login error";
            return thunkApi.rejectWithValue(message);

        }
    }
)

//REGISTER
export const register = createAsyncThunk(
    'auth/register',
    async ({ name, email, password }, thunkApi) => {
        try {
            const res = await API.post("http://localhost:8080/api/v1/user/register", { name, email, password });
            return res?.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Register error";
            return thunkApi.rejectWithValue(message);

        }
    }
)

//get user data (local)
export const getUserData = createAsyncThunk('/auth/getUserData', () => {
    const localData = localStorage.getItem('appData');
    const appData = JSON.parse(localData);
    return appData?.user;
});

//get token
export const loadToken = createAsyncThunk('/auth/loadToken', () => {
    const localData = localStorage.getItem('appData');
    const appData = JSON.parse(localData);
    return appData?.token;
});

// get LOGIN User Details (API)
export const getLoginUserDetails = createAsyncThunk(
    "user/getLoginUserDetails",
    async (id, thunkApi) => {
        try {
            const res = await API.get(`http://localhost:8080/api/v1/user/get-login-user/${id}`);
            //console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Login User details error";
            return thunkApi.rejectWithValue(message);
        }

    }
)


// update User
export const updateUserData = createAsyncThunk(
    "user/updateUserData",
    async ({ id, formData }, thunkApi) => {
        try {
            const res = await API.patch(`http://localhost:8080/api/v1/user/update/${id}`, formData, { // url get from routes
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            //console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Update User error";
            return thunkApi.rejectWithValue(message);
        }

    }
)

// RESET password 11:14:00
export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async ({ id, oldPassword, newPassword }, thunkApi) => {
        try {
            const res = await API.patch(`http://localhost:8080/api/v1/user/update-password/${id}`, { oldPassword, newPassword });
            //console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "UPDATE password error";
            return thunkApi.rejectWithValue(message);
        }

    }
)

// Send Web Message 11:48:00
export const sendWebMessage = createAsyncThunk(
    "user/sendWebMessage",
    async (msgData, thunkApi) => {
        try {
            const res = await API.post(`http://localhost:8080/api/v1/webmessage/create`, msgData);
            //console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "sendWebMessage error";
            return thunkApi.rejectWithValue(message);
        }

    }
)

//============= APPOINTMENT =============
// get All Appointments
export const getAllAppointments = createAsyncThunk(
    "appointment/getAllAppointments",
    async (id, thunkApi) => {
        try {
            const res = await API.get(`http://localhost:8080/api/v1/appointment/get-user-appointments/${id}`);
            //console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "User appointments error";
            return thunkApi.rejectWithValue(message);
        }

    }
)

// Cancel appointment status
export const cancelStatus = createAsyncThunk(
    "appointment/cancelStatus",
    async (id, thunkApi) => {
        try {
            const res = await API.post(`http://localhost:8080/api/v1/appointment/cancel/${id}`);
            //console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "User appointments STATUS error";
            return thunkApi.rejectWithValue(message);
        }

    }
)

// Book appointment
export const bookAppointment = createAsyncThunk(
    "appointment/bookAppointment",
    async (bookingData, thunkApi) => {
        try {
            const res = await API.post(`http://localhost:8080/api/v1/appointment/create`, bookingData);
            //console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Book appointment error";
            return thunkApi.rejectWithValue(message);
        }

    }
)

