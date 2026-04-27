import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/API"

// get All users
export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (_, thunkApi) => {
        try {
            const res = await API.get("/user/get-all");
            console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Get all users error";
            return thunkApi.rejectWithValue(message);
        }

    }
);

// get User Details
export const getUserDetails = createAsyncThunk(
    "user/getUserDetails",
    async (id, thunkApi) => {
        try {
            const res = await API.get(`/user/get-user/${id}`);
            console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "User details error";
            return thunkApi.rejectWithValue(message);
        }

    }
)

// get All Stats
export const getStats = createAsyncThunk(
    "user/getStats",
    async (_, thunkApi) => {
        try {
            const res = await API.get("/user/get-stats");
            console.log("API response:", res);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Get stats error";
            return thunkApi.rejectWithValue(message);
        }

    }
);
