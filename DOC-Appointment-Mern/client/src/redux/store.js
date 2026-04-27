import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/authSlice.js"
import UserReducer from "./slice/userSlice.js"
import DoctorReducer from "./slice/doctorSlice.js"
import AppointmentReducer from "./slice/appointmentSlice.js"

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        // user: UserReducer,
        doctor: DoctorReducer,
        // appointment: AppointmentReducer
    },
});

export default store;