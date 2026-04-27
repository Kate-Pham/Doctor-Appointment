import { createSlice } from "@reduxjs/toolkit";
import { bookAppointment, cancelStatus, getAllAppointments, getLoginUserDetails, getUserData, loadToken, login, register, resetPassword, sendWebMessage, updateUserData } from "../actions/authActions.js";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        success: false,
        user: null,
        appointments: null,
        token: null,
        error: null
    },
    reducers: {
        reset: (state) => {
            state.error = null;
            state.success = false;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            //login
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //register
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get User data
            .addCase(getUserData.fulfilled, (state, action) => {
                state.token = action.payload;
            })

            //get Login User details
            .addCase(getLoginUserDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLoginUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload.user;
            })
            .addCase(getLoginUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //Update User 
            .addCase(updateUserData.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload.user;
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //RESET password 
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //============== WEB MESSAGE =============
            //web message 
            .addCase(sendWebMessage.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendWebMessage.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(sendWebMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //============== APPOINTMENT =============
            // User appointments
            .addCase(getAllAppointments.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.appointments = action.payload.appointment; // 'appointment' reference from appointmentController.js
            })
            .addCase(getAllAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // User appointments STATUS
            .addCase(cancelStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(cancelStatus.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(cancelStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Book Appointment
            .addCase(bookAppointment.pending, (state) => {
                state.loading = true;
            })
            .addCase(bookAppointment.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(bookAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // load token
            .addCase(loadToken.fulfilled, (state, action) => {
                state.token = action.payload
            })


    }
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
