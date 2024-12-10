import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const Register = () => {
    const [user, setUser] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');

        if (!user.username || !user.password) {
            alert('Please fill in both username and password');
            return;
        }

        const isValid = await validateUser();
        if (isValid) {
            navigate('/');
        } else {
            alert('Invalid credentials');
        }
    };

    const validateUser = async () => {
        console.log('Validating user:', user);
        try {
            const response = await axios.post('http://localhost:5000/register', user);
            console.log('Response:', response);
            return true;
        } catch (error) {
            console.error('Validation error:', error);
        }
        return false;
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User Name</label>
                    <input
                        type="text"
                        placeholder="Enter user name"
                        onChange={({ target: { value } }) => setUser((prev) => ({ ...prev, username: value }))}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        onChange={({ target: { value } }) => setUser((prev) => ({ ...prev, password: value }))}
                    />
                </div>
                <div>
                    <button>Register</button>
                    <Link to="/">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register
