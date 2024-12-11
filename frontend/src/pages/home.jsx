import React from 'react'
import { useNavigate } from 'react-router-dom'

const home = () => {
    const navigate = useNavigate();
  return (
    <div>
        <h1>Home</h1>
        <button onClick={() => {
            console.log('Redirecting to login...');
            navigate('/login');
            }}>Login</button>

    </div>
  )
}

export default home
