import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAppointments, getAppointmentDetails, updateAppointmentStatus } from '../../redux/actions/appointmentActions'
import InputSelect from '../../components/Forms/InputSelect'
import toast from 'react-hot-toast'

const AppointmentDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [appointmentStatus, setAppointmentStatus] = useState('')

    useEffect(() => {
        dispatch(getAppointmentDetails(id))
    }, [dispatch, id]);

    const { appointment, success, error } = useSelector(state => state.appointment)

    useEffect(() => {
        if (appointment) {
            setAppointmentStatus(appointment?.bookingStatus); // check with appointmentModel.js
        }
    }, [appointment]);

    // Update status
    const handleUpdateStatus = () => {
        dispatch(updateAppointmentStatus({ id, appointmentStatus }))
        if (success) {
            toast.success("Appointment status updated!");
            dispatch(getAllAppointments()).then(() => {
                navigate("/all-appointments") // navigate AFTER data is refresh, no need to refresh page to get status update
            });
        }
        if (error) {
            toast.error(error)
        }
    }

    return (
        <Layout>
            <h1>Appointment Details</h1>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Client name</th>
                        <td>{appointment?.clientName}</td>
                    </tr>
                    <tr>
                        <th>Client phone</th>
                        <td>{appointment?.clientPhone}</td>
                    </tr>
                    <tr>
                        <th>Client email</th>
                        <td>{appointment?.clientEmail}</td>
                    </tr>
                    <tr>
                        <th>Doctor name</th>
                        <td>{appointment?.doctorName}</td>
                    </tr>
                    <tr>
                        <th>Doctor phone</th>
                        <td>{appointment?.doctorPhone}</td>
                    </tr>
                    <tr>
                        <th>Doctor email</th>
                        <td>{appointment?.doctorEmail}</td>
                    </tr>
                    <tr>
                        <th>Booking Date</th>
                        <td>{appointment?.bookingDate}</td>
                    </tr>
                    <tr>
                        <th>Booking Time</th>
                        <td>{appointment?.bookingTime}</td>
                    </tr>
                    <tr>
                        <th>Amount (SGD)</th>
                        <td>{appointment?.amount}</td>
                    </tr>
                    <tr>
                        <th>Booking Status</th>
                        <td>{appointment?.bookingStatus}</td>
                    </tr>
                </tbody>
            </table>
            <div className="mt-4 w-50">
                <h4>Update Booking Status</h4>
                {/* option "pending", "completed" reference from appointmentModel.js */}
                <InputSelect value={appointmentStatus} setValue={setAppointmentStatus} options={['pending', 'completed', 'cancel']} />
                <button className="btn btn-primary" onClick={handleUpdateStatus}>UPDATE STATUS</button>
            </div>
        </Layout>
    )
}

export default AppointmentDetails