import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions.js';
import { reset } from '../../redux/slice/authSlice.js';

const Login = () => {
    const [email, setEmail] = useState('user1@user.com');
    const [password, setPassword] = useState('');
    const [handled, setHandled] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogin = () => {
        // validation
        if (!email || !password) {
            return toast.error("Please provide email & password")
        }
        setHandled(false);
        dispatch(login({ email, password }))

    };
    const { success, error } = useSelector(state => state.auth)
    useEffect(() => {
        if (success && !handled) {
            toast.success('Login successfully');
            navigate("/home");
            dispatch(reset());
            setHandled(true);
        }
        if (error && !handled) {
            toast.error(error);
            dispatch(reset());
            setHandled(true);
        }
    }, [success, error, handled, dispatch, navigate])

    // form from Bootstrap, right-click convert HTML to JSX
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
                <h1>Admin panel</h1>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={(e => setEmail(e.target.value))} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e => setPassword(e.target.value))} />
                </div>

                <button className="btn btn-primary" onClick={handleLogin}>LOGIN</button>
            </div>
        </>
    )
}

export default Login