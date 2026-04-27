import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import EditUserProfile from './EditUserProfile'
import { useDispatch, useSelector } from 'react-redux'
import { getLoginUserDetails } from '../../redux/actions/authActions'
import { logout, reset } from '../../redux/slice/authSlice'

const UserProfile = () => {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    // useEffect(() => {
    //     dispatch(reset())
    //     const localData = localStorage.getItem('appData');
    //     const appData = JSON.parse(localData);
    //     if (appData) {
    //         const id = appData?.user?._id
    //         dispatch(getLoginUserDetails(id))
    //     }
    // }, [dispatch])

    useEffect(() => {
        //dispatch(reset())
        try {
            const localData = localStorage.getItem('appData');
            const appData = JSON.parse(localData);

            if (appData?.user?._id) {
                dispatch(getLoginUserDetails(appData.user._id));
            }
        } catch (error) {
            console.error("Invalid localStorage data");
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout())      // import 'logout'
        localStorage.removeItem('appData')
        navigate('/login')
        toast.success('Logout successfully')
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <h4 className="text-center">Manage Your Account & Appointment</h4>
                    <div className="col-md-3">
                        <img
                            src={
                                user?.image?.startsWith('data:image')
                                    ? user.image // already base64
                                    : user?.image
                                        ? `data:image/jpeg;base64,${user.image}` // raw base64
                                        : null
                            }
                            alt="userPic"
                            className="card p-2"
                            width={200}
                        />
                    </div>
                    <div className="col-md-8 mt-3">
                        <div className="user-container mb-3">
                            <h6>Name: {user?.name}</h6>
                            <h6>Gender: {user?.gender || "NA"}</h6>
                            <h6>DOB: {user?.dob || "NA"}</h6>
                            <h6>Email: {user?.email}</h6>
                            <h6>Phone: {user?.phone || "NA"}</h6>
                            <h6>Address: {user?.address || "NA"}</h6>
                            <h4>
                                <Link to={`/user/reset-password/${user?._id}`}>Reset Password</Link>
                            </h4>
                        </div>

                        {/* button */}
                        <div className="button-container mt-5">
                            {/* CHANGE setIsOpen(!isOpen) ---> setIsOpen(true): cleaner than toggle */}
                            <button className='btn btn-warning' onClick={() => setIsOpen(true)}>
                                <i className="fa-solid fa-pen-to-square"></i>Edit Profile
                            </button>
                            <button className='btn btn-primary ms-3' onClick={() => navigate("/user/appointments")}>
                                <i className="fa-solid fa-list"></i>Appointments
                            </button>
                            <button className='btn btn-danger ms-3' onClick={handleLogout}>
                                <i className="fa-solid fa-power-off"></i>LOGOUT
                            </button>
                        </div>
                    </div>
                </div >
            </div >

            {/* edit model */}
            {isOpen && <EditUserProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />}
        </>
    )
}

export default UserProfile