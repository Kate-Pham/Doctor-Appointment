import { createSlice } from "@reduxjs/toolkit";
import { addDoctor, deleteDoctor, getAllDoctors, getDoctorDetails, updateDoctor, updateStatus } from "../actions/doctorActions";

const doctorSlice = createSlice({
    name: "doctor",
    initialState: {
        loading: false,
        success: false,
        doctors: null,
        doctor: null,
        error: null,
    },
    reducers: {
        reset: (state) => {
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            //getAllDoctors
            .addCase(getAllDoctors.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllDoctors.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.doctors = action.payload.doctors; // check "doctors" match with variable in appointmentController.js
            })
            .addCase(getAllDoctors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get Doctor Details
            .addCase(getDoctorDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDoctorDetails.fulfilled, (state, action) => {
                console.log("DATA:", action.payload);
                state.loading = false;
                state.success = true;
                state.doctor = action.payload.doctor;
            })
            .addCase(getDoctorDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Add Doctor
            .addCase(addDoctor.pending, (state) => {
                state.loading = true;
            })
            .addCase(addDoctor.fulfilled, (state, action) => {
                console.log("DATA:", action.payload);
                state.loading = false;
                state.success = true;
                state.doctor = action.payload.doctor;
            })
            .addCase(addDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Update Doctor
            .addCase(updateDoctor.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateDoctor.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                // state.doctor = action.payload.doctor;
            })
            .addCase(updateDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Delete Doctor (9:16:00)
            .addCase(deleteDoctor.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteDoctor.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                // state.doctor = action.payload.doctor;
            })
            .addCase(deleteDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Update status Doctor
            .addCase(updateStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.doctor = action.payload.doctor;
            })
            .addCase(updateStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { reset } = doctorSlice.actions;
export default doctorSlice.reducer;