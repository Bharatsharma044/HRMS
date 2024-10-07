import React from 'react'
import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../../lib/constants.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './login.css';
// import styles from './login.module.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const onUpdateField = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        }

        if (!form.password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`${BASE_API_URL}user/login_auth`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });

                const data = await response.json();
                setMsg(data.msg);

                if (response.ok) {
                    const authToken = data.authToken;
                    localStorage.setItem("token", authToken);

                    try {
                        const userResponse = await fetch(`${BASE_API_URL}user/getuserbyid?userid=${data.user._id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': authToken,
                            },
                        });

                        if (!userResponse.ok) {
                            throw new Error('Failed to fetch user data');
                        }

                        const userData = await userResponse.json();
                        const name = `${userData.data.fname} ${userData.data.lname}`;

                        localStorage.setItem("_id", userData.data._id);
                        localStorage.setItem("name", name);
                        localStorage.setItem("email", userData.data.email);
                        localStorage.setItem("role", userData.data.role);

                        if (userData.data.role === "admin") {
                            navigate('/admin');
                        } else {
                            navigate('/user');
                        }

                    } catch (err) {
                        console.error("Error fetching user data:", err);
                    }

                } else {
                    console.error('Login failed');
                }
            } catch (error) {
                console.error('Error occurred:', error);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={onSubmitForm}>
                <h2 className="form-title">Login</h2>
                <div className="input-group">
                    <input
                        className="input-field"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={onUpdateField}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="input-group password-group">
                    <input
                        className="input-field"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={onUpdateField}
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <button className="submit-button" type="submit">Login</button>
                <p className="forgot-password">Forgot Password?</p>
                <div className="social-login">
                    <p>OR</p>
                    <div className="social-icons">
                        <a href="#"><img src="/path/to/google-icon" alt="Google" /></a>
                        <a href="#"><img src="/path/to/facebook-icon" alt="Facebook" /></a>
                        <a href="#"><img src="/path/to/linkedin-icon" alt="LinkedIn" /></a>
                    </div>
                </div>
                <p className="msg">{msg}</p>
            </form>
            <div className="signup-link">
                <p>Need an account? <Link to="/signup">Signup</Link></p>
            </div>
        </div>
    );
};

export default Login;
