import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/API";

// get All appointments
export const getAllAppointments = createAsyncThunk(
    "appointment/getAllAppointments",
    async (_, thunkApi) => {
        try {
            const res = await API.get("/appointment/get-all");
            console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Get all appointments error";
            return thunkApi.rejectWithValue(message);
        }

    }
);

// get Appointment Details
export const getAppointmentDetails = createAsyncThunk(
    "appointment/getAppointmentDetails",
    async (id, thunkApi) => {
        try {
            const res = await API.get(`/appointment/get-details/${id}`);
            console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Appointment details error";
            return thunkApi.rejectWithValue(message);
        }

    }
)

// // Add Doctor
// export const addDoctor = createAsyncThunk(
//     "doctor/addDoctor",
//     async (formData, thunkApi) => {
//         try {
//             const res = await API.post("/doctor/add", formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             console.log("API response:", res);
//             return res.data;
//         } catch (error) {
//             const message = error?.response?.data?.message || error.message || "Add doctors error";
//             return thunkApi.rejectWithValue(message);
//         }

//     }
// );

// // Update Doctor
// export const updateDoctor = createAsyncThunk(
//     "doctor/updateDoctor",
//     async ({ id, formData }, thunkApi) => {
//         try {
//             const res = await API.patch(`/doctor/update/${id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             console.log("API response:", res);
//             return res.data;
//         } catch (error) {
//             const message = error?.response?.data?.message || error.message || "Update doctor error";
//             return thunkApi.rejectWithValue(message);
//         }

//     }
// );

// // Delete Doctor
// export const deleteDoctor = createAsyncThunk(
//     "doctor/deleteDoctor",
//     async (id, thunkApi) => {
//         try {
//             const res = await API.delete(`/doctor/delete/${id}`);
//             console.log("API response:", res);
//             return res.data;
//         } catch (error) {
//             const message = error?.response?.data?.message || error.message || "Delete doctor error";
//             return thunkApi.rejectWithValue(message);
//         }

//     }
// );

// Update Appointment Status (9:46:00)
export const updateAppointmentStatus = createAsyncThunk(
    "appointment/updateAppointmentStatus",
    async ({ id, appointmentStatus }, thunkApi) => {
        try {
            const res = await API.patch(`/appointment/update-status/${id}`, { appointmentStatus });
            console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Update Appointment Status error";
            return thunkApi.rejectWithValue(message);
        }

    }
);