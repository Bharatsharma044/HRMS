import { useState } from "react";
// import "./signup.css";
import { Link } from 'react-router-dom';
import { BASE_API_URL } from '../../lib/constants.js';
import styles from './signup.module.css';

const SignUpForm = () => {
    const [form, setForm] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        dob: "",
        gender: "",
        standard: "",
        address: "",
        city: "",
        state: "",
    });

    const [msg, setMsg] = useState("");
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

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

    const onUpdateField = e => {
        const nextFormState = {
            ...form,
            [e.target.name]: e.target.value,
        };
        setForm(nextFormState);
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`${BASE_API_URL}user/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });

                if (response.ok) {
                    const data = await response.json();
                    setMsg(data.msg);
                    if (data.success) {
                        setForm({
                            fname: "",
                            lname: "",
                            email: "",
                            password: "",
                            dob: "",
                            gender: "",
                            standard: "",
                            address: "",
                            city: "",
                            state: "",
                        });
                    }
                } else {
                    console.error('Signup failed');
                }
            } catch (error) {
                console.error('Error occurred:', error);
            }
        }
    };

    return (
        <div className={styles['signup-container']}>
        <form className={styles['signup-form']} onSubmit={onSubmitForm}>
            <h2 className={styles['form-title']}>Signup</h2>
            {msg && <span className={styles['form-message']}>{msg}</span>}
    
            <div className={styles['input-group']}>
                <input
                    className={styles['input-field']}
                    type="text"
                    name="fname"
                    placeholder="First Name"
                    value={form.fname}
                    onChange={onUpdateField}
                />
            </div>
            <div className={styles['input-group']}>
                <input
                    className={styles['input-field']}
                    type="text"
                    name="lname"
                    placeholder="Last Name"
                    value={form.lname}
                    onChange={onUpdateField}
                />
            </div>
            <div className={styles['input-group']}>
                <input
                    className={styles['input-field']}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={onUpdateField}
                />
                {errors.email && <span className={styles['error']}>{errors.email}</span>}
            </div>
            <div className={styles['input-group']} className={styles['password-group']}>
                <input
                    className={styles['input-field']}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={onUpdateField}
                />
                <span
                    className={styles['password-toggle']}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "🙈" : "👁️"}
                </span>
                {errors.password && <span className={styles['error']}>{errors.password}</span>}
            </div>
            <div className={styles['input-group']}>
                <input
                    className={styles['input-field']}
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={onUpdateField}
                />
            </div>
            <div className={styles['input-group']}>
                <input
                    className={styles['input-field']}
                    type="text"
                    name="gender"
                    placeholder="Gender"
                    value={form.gender}
                    onChange={onUpdateField}
                />
            </div>
            <div className={styles['input-group']}>
                <input
                    className={styles['input-field']}
                    type="text"
                    name="standard"
                    placeholder="Standard"
                    value={form.standard}
                    onChange={onUpdateField}
                />
            </div>
            <div className={styles['input-group']}>
                <input
                    className={styles['input-field']}
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={onUpdateField}
                />
            </div>
            <div className={styles['input-group']}>
                <input
                    className={styles['input-field']}
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={onUpdateField}
                />
            </div>
            <div className={styles['input-group']}>
                <input
                    className={styles['input-field']}
                    type="text"
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={onUpdateField}
                />
            </div>
            <button className={styles['submit-button']} type="submit">Signup</button>
        </form>
        <div className={styles['signup-footer']}>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
    
    );
};

export default SignUpForm;
