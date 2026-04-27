import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/API"

// get All doctors
export const getAllDoctors = createAsyncThunk(
    "doctor/getAllDoctors",
    async (_, thunkApi) => {
        try {
            const res = await API.get("/doctor/get-all");
            console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Get all doctors error";
            return thunkApi.rejectWithValue(message);
        }

    }
);

// get Doctor Details
export const getDoctorDetails = createAsyncThunk(
    "doctor/getDoctorDetails",
    async (id, thunkApi) => {
        try {
            const res = await API.get(`/doctor/get-details/${id}`);
            console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Doctor details error";
            return thunkApi.rejectWithValue(message);
        }

    }
)

// Add Doctor
export const addDoctor = createAsyncThunk(
    "doctor/addDoctor",
    async (formData, thunkApi) => {
        try {
            const res = await API.post("/doctor/add", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Add doctors error";
            return thunkApi.rejectWithValue(message);
        }

    }
);

// Update Doctor
export const updateDoctor = createAsyncThunk(
    "doctor/updateDoctor",
    async ({ id, formData }, thunkApi) => {
        try {
            const res = await API.patch(`/doctor/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Update doctor error";
            return thunkApi.rejectWithValue(message);
        }

    }
);

// Delete Doctor
export const deleteDoctor = createAsyncThunk(
    "doctor/deleteDoctor",
    async (id, thunkApi) => {
        try {
            const res = await API.delete(`/doctor/delete/${id}`);
            console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Delete doctor error";
            return thunkApi.rejectWithValue(message);
        }

    }
);

// Update Status (9:21:00)
export const updateStatus = createAsyncThunk(
    "doctor/updateStatus",
    async ({ id, availableStatus }, thunkApi) => {
        try {
            const res = await API.patch(`/doctor/update-status/${id}`, { availableStatus });
            console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Update status doctor error";
            return thunkApi.rejectWithValue(message);
        }

    }
);