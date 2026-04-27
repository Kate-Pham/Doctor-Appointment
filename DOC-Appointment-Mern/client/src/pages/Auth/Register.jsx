import React, { useEffect, useState } from 'react'
import './Auth.css'
import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../../redux/slice/authSlice';
import { register } from '../../redux/actions/authActions';


const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()  // 10:09:13
    const navigate = useNavigate()
    const { error, success } = useSelector(state => state.auth)

    const handleSubmit = (e) => {       // 10:11:44
        e.preventDefault();
        if (!name || !email || !password) {
            return toast.error("Please provide all fields!")
        }
        dispatch(register({ name, email, password }))
    }

    useEffect(() => {
        if (success) {
            toast.success("Register successfully");
            setName('');
            setEmail('');
            setPassword('');
            navigate('/login');
            dispatch(reset());
        }
        if (error) {
            toast.error(error);
            dispatch(reset())
        }
    }, [dispatch, error, success, navigate])

    return (
        <>
            <div className="auth-container">
                <div className="card">
                    <h2>Create an account</h2>
                    <p>Please enter your details to register</p>
                    <div className="form-group mb-3">
                        <input type="text" placeholder='enter your name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <input type="password" placeholder='enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button
                        className='btn btn-primary'
                        disabled={!name || !email || !password}
                        onClick={handleSubmit}
                    >
                        REGISTER
                    </button> {/* Button appear when 3 variable got value */}

                    <p className='mt-3'>Already a User? <NavLink to="/login">Login here!</NavLink></p>
                </div>
            </div>
        </>
    )
}

export default Register