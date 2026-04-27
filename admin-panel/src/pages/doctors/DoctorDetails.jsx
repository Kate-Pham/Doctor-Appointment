import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteDoctor, getAllDoctors, getDoctorDetails, updateDoctor, updateStatus } from '../../redux/actions/doctorActions'
import InputForm from '../../components/Forms/InputForm'
import InputSelect from '../../components/Forms/InputSelect'
import toast from 'react-hot-toast'

const DoctorDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getDoctorDetails(id))
    }, [dispatch, id])

    const { doctor, success, error } = useSelector(state => state.doctor)
    const [edit, setEdit] = useState(true)

    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(null)
    const [speciality, setSpeciality] = useState('')
    const [experience, setExperience] = useState('')
    const [degree, setDegree] = useState('')
    const [about, setAbout] = useState('')
    const [fees, setFees] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        if (doctor) {
            setName(doctor?.name);
            setDob(doctor?.dob);
            setEmail(doctor?.email);
            setAbout(doctor?.about);
            setSpeciality(doctor?.speciality);
            setDegree(doctor?.degree);
            setExperience(doctor?.experience);
            setGender(doctor?.gender);
            setImage(doctor?.image);
            setAddress(doctor?.address);
            setFees(doctor?.fees);
            setPhone(doctor?.phone);
        }
    }, [doctor]);

    //Delete Doctor
    const handleDelete = () => {
        const confirm = window.confirm("Are you sure want to delete this Doctor?")
        if (confirm) {
            dispatch(deleteDoctor(id))
        }
        if (success) {
            toast.success("Doctor Deleted!")
            dispatch(getAllDoctors()).then(() => {
                navigate("/all-doctors"); // navigate AFTER data is fresh
            });
        }
        if (error) {
            toast.error(error)
        }
    };


    //UPDATE doctor
    const handleUpdate = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('dob', dob)
        formData.append('email', email)
        formData.append('about', about)
        formData.append('speciality', speciality)
        formData.append('experience', experience)
        formData.append('degree', degree)
        formData.append('fees', fees)
        formData.append('address', address)
        formData.append('phone', phone)
        formData.append('gender', gender)
        if (image instanceof File) {
            formData.append('image', image)
        }
        dispatch(updateDoctor({ id, formData }))
        if (success) {
            toast.success("Doctor Updated");
            dispatch(getAllDoctors()).then(() => {
                navigate("/all-doctors"); // navigate AFTER data is fresh
            });
        }
        if (error) {
            toast.error(error);
        }
    };

    //UPDATE status
    const handleUpdateStatus = (id, availableStatus) => {
        dispatch(updateStatus({ id, availableStatus }))
        if (success) {
            toast.success("Doctor Status Updated");
            dispatch(getAllDoctors()).then(() => {
                navigate("/all-doctors"); // navigate AFTER data is fresh, no need to refresh page to get status update
            });

        }
        if (error) {
            toast.error(error);
        }
    };

    return (
        <Layout>
            {/* <h1>Doctor Details</h1> */}
            <div className="d-flex p-3 justify-content-between bg-light">
                <h1>Doctor Details</h1>
                <div className="ms-auto">
                    <button className="btn btn-warning ms-3" onClick={() => setEdit(!edit)}>{edit ? 'EDIT' : 'CANCEL'}</button>
                    <button className="btn btn-danger ms-3" onClick={() => handleDelete(doctor?._id)}>DELETE</button>
                </div>
            </div>

            <div className="w-75">
                <img src={`data:image/jpeg;base64,${doctor?.image}`} alt="doctorImage" className='bg-info border rounded-3' height={250} width={250} />
                <InputForm label={'Name'} value={name} setValue={setName} disabled={edit} />
                <InputForm type="date" label={'Date of Birth'} value={dob} setValue={setDob} disabled={edit} />
                <InputForm label={'Email'} value={email} setValue={setEmail} disabled={edit} />
                <InputForm label={'Degree'} value={degree} setValue={setDegree} disabled={edit} />
                <InputSelect
                    label={'Speciality'}
                    value={speciality}
                    setValue={setSpeciality}
                    options={[
                        "General",
                        "Dental",
                        "Mental",
                        "Eye"
                    ]}
                    disabled={edit}
                />
                <InputSelect
                    label={'Gender'}
                    value={gender}
                    setValue={setGender}
                    options={[
                        "Male",
                        "Female"
                    ]}
                    disabled={edit}
                />
                <InputForm label={'Experience'} value={experience} setValue={setExperience} disabled={edit} />
                <InputForm label={'Fees'} value={fees} setValue={setFees} disabled={edit} />
                <InputForm label={'About'} value={about} setValue={setAbout} disabled={edit} />
                <InputForm label={'Phone'} value={phone} setValue={setPhone} disabled={edit} />
                <InputForm label={'Address'} value={address} setValue={setAddress} disabled={edit} />
                <div className="mb-3">
                    <label htmlFor='form-label'>Select Image File:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className='form-control'
                        disabled={edit}
                    />
                </div>

                {/* Update doctor */}

                <div className="flex" style={{ marginBottom: '50px' }}>
                    <button className="btn btn-primary" onClick={() => handleUpdate(doctor?._id)}>
                        UPDATE DOCTOR
                    </button>
                    {doctor?.available ? (
                        <button className="btn btn-danger" onClick={() => handleUpdateStatus(doctor?._id, false)}>
                            MARK AS Unavailable
                        </button>
                    ) : (
                        <button className="btn btn-success" onClick={() => handleUpdateStatus(doctor?._id, true)}>
                            MARK AS Available
                        </button>
                    )}
                </div>

            </div>
        </Layout>
    )
}

export default DoctorDetails