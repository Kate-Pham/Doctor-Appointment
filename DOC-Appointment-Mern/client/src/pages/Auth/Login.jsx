import React, { useEffect, useState } from 'react'
import './Auth.css'
import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../redux/slice/authSlice';
import { login } from '../../redux/actions/authActions';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()  // 10:13:13
    const navigate = useNavigate()
    const { error, success } = useSelector(state => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return toast.error("Please provide all fields!")
        }
        dispatch(login({ email, password }))
    }

    useEffect(() => {
        if (success) {
            toast.success("Login successfully");
            navigate('/doctors');
            setEmail('');
            setPassword('');
            //dispatch(reset());
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
                    <h2>Login</h2>
                    <p>Please enter your email & password</p>

                    <div className="form-group mb-3">
                        <input type="text" placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" placeholder='enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {/* Button appear when 2 variable got value */}
                    <button
                        className='btn btn-primary'
                        disabled={!email || !password}
                        onClick={handleSubmit}
                    >
                        LOGIN</button>

                    <p className='mt-3'>Not a User? <NavLink to="/register">Register here!</NavLink></p>
                </div>
            </div>
        </>
    )
}

export default Login