import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Dashboard = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5000/auth').then((response) => {
      if (response.data.status === 'ok') {
        setAuth(true);
        setName(response.data.username);
      }
  }, [])
});
  const navigate = useNavigate();
  const handlelogout = () => {
    axios.get('http://localhost:5000/logout').then((response) => {
      if (response.data.status === 'ok') {
        setAuth(false);
        navigate('/');
      }
    })
  }
  return (
    auth ? 
      <div>
        <h1>Dashboard</h1>
        <h3>Welcome back {name}</h3>
        <button onClick={handlelogout}>Logout</button>
      </div> : 
      <div>
          <h1>Unauthorized</h1>
          <button onClick={() =>{
            navigate('/');
          }}>Login</button>
      </div>
  )
}

export default Dashboard
