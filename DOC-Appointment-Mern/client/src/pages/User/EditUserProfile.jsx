import React, { useEffect, useState } from 'react'
import './User.css'
import { useDispatch, useSelector } from 'react-redux'
//import { useNavigate } from 'react-router-dom'
import { getLoginUserDetails, getUserData, updateUserData } from '../../redux/actions/authActions'
import toast from 'react-hot-toast'
import { reset } from '../../redux/slice/authSlice'

const EditUserProfile = ({ isOpen, onClose }) => {

    const dispatch = useDispatch()        // 10:43:00
    //const navigate = useNavigate()

    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState('')
    const [preview, setPreview] = useState(null) // for image preview
    const [actionTriggered, setActionTriggered] = useState(false)

    // useEffect(() => {
    //     dispatch(getLoginUserDetails(id))
    // }, [dispatch])

    const { user, success, error, loading } = useSelector(state => state.auth) // add loading

    useEffect(() => {
        if (user) {
            setName(user?.name || '')
            setGender(user?.gender || '')
            setDob(user?.dob ? user.dob.split('T')[0] : '')  // date format
            setPhone(user?.phone || '')
            setAddress(user?.address || '')
            setImage('')  //reset image file instead of storing base64
            setPreview(user?.image ? `data:image/jpeg;base64,${user.image}` : '')
        }
    }, [user])

    // Handle image properly with preview
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    //handleUpdate. 10:49:00
    const handleUpdate = (id) => {
        const formData = new FormData()
        if (image) {
            formData.append('image', image)  //only append if new image selected
        }
        formData.append('name', name)
        formData.append('gender', gender)
        formData.append('dob', dob)
        formData.append('phone', phone)
        formData.append('address', address)

        setActionTriggered(true)
        dispatch(reset())
        dispatch(updateUserData({ id, formData }))
    };

    useEffect(() => {

        if (!actionTriggered) return

        if (success) {
            toast.success("User Updated")
            const localData = localStorage.getItem('appData')
            const appData = JSON.parse(localData)
            if (appData?.user?._id) {
                dispatch(getLoginUserDetails(appData.user._id)) // ✅ re-fetch with id
            }
            dispatch(reset())
            setActionTriggered(false)
            onClose()
        }
        if (error) {
            toast.error(error)
            dispatch(reset())
            setActionTriggered(false)
        }
    }, [success, error, actionTriggered])

    if (!isOpen) return null

    return (
        <>
            {/* Search, copy, paste "Modal" on Bootstrap. Select/ Convert HTML to JSX */}
            <div className="editModal modal d-block" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Your Profile</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={onClose} />
                        </div>
                        <div className="modal-body">
                            <div className="mod-details d-flex flex-column">
                                <h4>Image</h4>
                                <img
                                    src={preview || null}
                                    alt="userPic"
                                    height={80}
                                    width={100}
                                />
                                <input type="file" onChange={handleImageChange} />
                                <input type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                                <div className="d-flex flex-row">
                                    <select className="m-1" value={gender} onChange={e => setGender(e.target.value)}>
                                        <option value="">Select Gender</option>
                                        <option value="male" >Male</option>
                                        <option value="female" >Female</option>
                                    </select>
                                </div>
                                <input type="date" placeholder='dob' value={dob} onChange={e => setDob(e.target.value)} />
                                <input type="text" placeholder='phone' value={phone} onChange={e => setPhone(e.target.value)} />
                                <input type="text" placeholder='address' value={address} onChange={e => setAddress(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                onClick={onClose}>Close</button>
                            {/* Add loading UX */}
                            <button type="button" className="btn btn-primary" onClick={() => handleUpdate(user?._id)} disabled={loading}>{loading ? 'Saving...' : 'Save changes'}</button>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default EditUserProfile