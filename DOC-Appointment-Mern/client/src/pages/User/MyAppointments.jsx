import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cancelStatus, getAllAppointments } from '../../redux/actions/authActions'
import { Button } from 'bootstrap'
import toast from 'react-hot-toast'
import { Link } from 'react-router'

// 10:58:00
const MyAppointments = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const localData = localStorage.getItem('appData')
        const appData = JSON.parse(localData)
        if (appData?.user?._id) {
            dispatch(getAllAppointments(appData.user._id)) // ✅ re-fetch with id
        }
    }, [dispatch])

    const { appointments, error, success } = useSelector(state => state.auth)

    const handleCancel = (id) => {
        dispatch(cancelStatus(id))
        if (success) {
            toast.success("Cancel Successfully");
            window.location.reload();
        }
        if (error) {
            toast.error(error)
        }
    }
    return (
        <>
            <h1>My All Appointments</h1>
            <table className="table">
                <thead>
                    <tr>
                        <td>SNO</td>
                        <td>Booking Date</td>
                        <td>Fees</td>
                        <td>Status</td>
                        <td>Details</td>
                        <td>Update Booking</td>
                    </tr>
                </thead>
                <tbody>
                    {appointments?.length > 0 && appointments?.map((a, i) => (
                        <tr key={i + 1}>
                            <td>{i + 1}</td>
                            <td>{a?.slotDate}</td>
                            <td>{a?.amount}</td>
                            <td>{a?.status}</td>
                            <td>
                                <Link to={`/user/appointments/:id, ${a?._id}`}>Details</Link>
                            </td>
                            <td>
                                {a?.status === 'pending' ? <button className='btn btn-danger' onClick={() => handleCancel(a?._id)}>Cancel</button> : "NA"}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </>
    )
}

export default MyAppointments