import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const dashboard = () => {
    const navigator = useNavigate();
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    useEffect(() => {
      const fetchAuthStatus = async () => {
        try {
          const response = await axios.get('http://localhost:5000/auth', { withCredentials: true });
          if (response.data.decoded) {
            setUser(response.data.decoded);
            setAuth(true);
            setRole(response.data.decoded.role);
          } else {
            setAuth(false);
          }
        } catch (error) {
          console.error('Error fetching auth status:', error);
          setAuth(false);
        }
      };
  
      fetchAuthStatus();
    }, []);
    return (
      <div>
        {auth ? 
        <div>
          <h1>Dashboard {role}</h1>

          <button onClick={async() =>{
            await axios.get('http://localhost:5000/logout');
            setAuth(false);
            setUser(null);
          }}>Logout</button>
        </div> : 
        <div>
          <h1>Not Authorized</h1>
          <button onClick={() => {
            console.log('Redirecting to login...');
            navigator('/login');
            }}>Login</button>
        </div>
        }
      </div>
    )
}
export default dashboard
