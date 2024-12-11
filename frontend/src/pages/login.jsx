import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const login = () => {
    
    const[user, setUser] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate();
  return (
    <form onSubmit={async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/login', user);
        if(response.data === 'Ok'){
            navigate('/dashboard');
        }else{
            alert('Invalid username or password');
        }
    }}>
      <h1>Login</h1>
      <div>
      <label htmlFor="">Username: 
        <input type="text" placeholder='username' onChange={(e) => {
            setUser({...user, username: e.target.value});
        }}/>
      </label>
      </div>
      <div>
      <label htmlFor="">Password: 
        <input type="password" placeholder='password' onChange={(e) => {
            setUser({...user, password: e.target.value});
        }}/>
      </label>
      </div>
    <button type='submit'>Login</button>
    <Link to='/register'>Register</Link>
    </form>
  )
}

export default login
