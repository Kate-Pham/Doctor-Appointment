import { createSlice } from "@reduxjs/toolkit";
import { getAllAppointments, getAppointmentDetails, updateAppointmentStatus } from "../actions/appointmentActions";

const appointmentSlice = createSlice({
    name: "appointment",
    initialState: {
        loading: false,
        success: false,
        appointments: null,
        appointment: null,
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
            //getAllAppointments
            .addCase(getAllAppointments.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllAppointments.fulfilled, (state, action) => {
                //console.log("DATA:", action.payload);
                state.loading = false;
                state.success = true;
                state.appointments = action.payload.appointments; // check "appointments" match with variable in appointmentController.js
            })
            .addCase(getAllAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get Appointments Details
            .addCase(getAppointmentDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAppointmentDetails.fulfilled, (state, action) => {
                //console.log("DATA:", action.payload);
                state.loading = false;
                state.success = true;
                state.appointment = action.payload.appointmentDetails; // check "appointmentDetails" at appointmentsController.js
            })
            .addCase(getAppointmentDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // //Add Doctor
            // .addCase(addDoctor.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(addDoctor.fulfilled, (state, action) => {
            //     console.log("DATA:", action.payload);
            //     state.loading = false;
            //     state.success = true;
            //     state.doctor = action.payload.doctor;
            // })
            // .addCase(addDoctor.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // })

            // //Update Doctor
            // .addCase(updateDoctor.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(updateDoctor.fulfilled, (state) => {
            //     state.loading = false;
            //     state.success = true;
            //     // state.doctor = action.payload.doctor;
            // })
            // .addCase(updateDoctor.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // })

            // //Delete Doctor (9:16:00)
            // .addCase(deleteDoctor.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(deleteDoctor.fulfilled, (state) => {
            //     state.loading = false;
            //     state.success = true;
            //     // state.doctor = action.payload.doctor;
            // })
            // .addCase(deleteDoctor.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // })

            //Update status Appointment
            .addCase(updateAppointmentStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAppointmentStatus.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                //state.appointment = action.payload.appointment;
            })
            .addCase(updateAppointmentStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { reset } = appointmentSlice.actions;
export default appointmentSlice.reducer;