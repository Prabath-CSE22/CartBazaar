import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
    axios.defaults.withCredentials = true;
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
            navigate('/dashboard');
        } else {
            alert('Invalid credentials');
        }
    };

    const validateUser = async () => {
        console.log('Validating user:', user);
        try {
            const response = await axios.post('http://localhost:5000/login', user);
            console.log('Response:', response);
            if (response.data.status === 'ok') {
                return true;
            }
        } catch (error) {
            console.error('Validation error:', error);
        }
        return false;
    };

    return (
        <div>
            <div>
                <h1>Login</h1>
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
                    <button type="submit">Login</button>
                    <Link to="/register">Register</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
