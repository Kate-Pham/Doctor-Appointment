import React, { useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAllAppointments } from '../../redux/actions/appointmentActions'

const AllAppointments = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllAppointments())
    }, [dispatch])

    const { appointments } = useSelector(state => state.appointment)
    return (
        <Layout>
            <h1>AllAppointments</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>SNO</th>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>AMOUNT (SGD)</th>
                            <th>STATUS</th>
                            <th>PAYMENT</th>
                            <th>DETAILS/EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments?.map((a, i) => (
                            <tr key={i + 1}>
                                <td>{i + 1}</td>
                                <td>{a?._id}</td>
                                <td>{a?.slotDate}</td>
                                <td>{a?.amount}</td>
                                <td>{a?.status}</td>
                                <td>{a?.payment}</td>
                                <td>
                                    <Link to={`/appointment-details/${a?._id}`}>More Details</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default AllAppointments