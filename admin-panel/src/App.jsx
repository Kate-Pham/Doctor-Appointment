import { Toaster } from 'react-hot-toast'
import './App.css'
import Login from './pages/user/Login.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AllUsers from './pages/user/AllUsers.jsx'
import UserDetails from './pages/user/UserDetails.jsx'
import AllDoctors from './pages/doctors/AllDoctors.jsx'

import AddDoctor from './pages/doctors/AddDoctor.jsx'
import DoctorDetails from './pages/doctors/DoctorDetails.jsx'

import AllAppointments from './pages/appointments/AllAppointments.jsx'
import AppointmentDetails from './pages/appointments/AppointmentDetails.jsx'

function App() {

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
        <Route path="/all-doctors" element={<AllDoctors />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/doctor-details/:id" element={<DoctorDetails />} />
        <Route path="/all-appointments" element={<AllAppointments />} />
        <Route path="/appointment-details/:id" element={<AppointmentDetails />} />
      </Routes>
    </>
  )
}

export default App
