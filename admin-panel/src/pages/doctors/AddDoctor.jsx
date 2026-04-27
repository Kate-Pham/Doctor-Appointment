import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addDoctor } from "../../redux/actions/doctorActions";
import InputForm from '../../components/Forms/InputForm'
import InputSelect from '../../components/Forms/InputSelect'
import toast from 'react-hot-toast';


const AddDoctor = () => {
    const [name, setName] = useState('demo')
    const [dob, setDob] = useState('1990-04-12')
    const [email, setEmail] = useState('demo@demo.com')
    const [image, setImage] = useState(null)
    const [speciality, setSpeciality] = useState('')
    const [experience, setExperience] = useState('2')
    const [degree, setDegree] = useState('demo')
    const [about, setAbout] = useState('demo')
    const [fees, setFees] = useState('200')
    const [address, setAddress] = useState('demo')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('0123456789')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleAddDoctor = () => {
        if (!name || !dob || !email || !about || !speciality || !experience || !degree || !fees || !address || !phone || !gender || !image) {
            return toast.error('Please provide all fields');
        }

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
        formData.append('image', image)

        dispatch(addDoctor(formData))
        if (success) {
            toast.success('Doctor Created!')
            navigate('/all-doctors')
        }
        if (error) {
            toast.error(error)
        }
    }

    const { success, error } = useSelector((state) => state.doctor)

    return (
        <Layout>
            {/* <h1>AddDoctor</h1> */}
            <div className="d-flex p-3 justify-content-between bg-light">
                <button className='btn btn-primary' onClick={() => navigate("/all-doctors")}>
                    GO BACK
                </button>
            </div>
            {/* <h1>Doctor Details</h1> */}
            <div className="w-75">
                <InputForm label={'Name'} value={name} setValue={setName} />
                <InputForm type="date" label={'Date of Birth'} value={dob} setValue={setDob} />
                <InputForm label={'Email'} value={email} setValue={setEmail} />
                <InputForm label={'Degree'} value={degree} setValue={setDegree} />
                <InputSelect
                    label={'Speciality'}
                    value={speciality}
                    setValue={setSpeciality}
                    options={[
                        "Select Speciality",
                        "General",
                        "Dental",
                        "Mental",
                        "Eye"
                    ]} />
                <InputSelect
                    label={'Gender'}
                    value={gender}
                    setValue={setGender}
                    options={[
                        "Select Gender",
                        "Male",
                        "Female"
                    ]} />
                <InputForm label={'Experience'} value={experience} setValue={setExperience} />
                <InputForm label={'Fees'} value={fees} setValue={setFees} />
                <InputForm label={'About'} value={about} setValue={setAbout} />
                <InputForm label={'Phone'} value={phone} setValue={setPhone} />
                <InputForm label={'Address'} value={address} setValue={setAddress} />
                <div className="mb-3">
                    <label htmlFor='form-label'>Select Image File:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className='form-control'
                    />
                </div>
                <button className="btn btn-primary" onClick={handleAddDoctor}>
                    ADD NEW DOCTOR
                </button>
            </div>
        </Layout>
    )
}

export default AddDoctor