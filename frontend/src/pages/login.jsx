import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './login.module.css'

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
    }} className={styles.lform}>
      <h1>Login</h1>
      <div className={styles.inputbox}>
        <input type="text" placeholder='username' onChange={(e) => {
            setUser({...user, username: e.target.value});
          }} className={styles.input}/>
          <i className={`bx bx-user ${styles.icon}`}></i>
        
          <input type="password" placeholder='password' onChange={(e) => {
            setUser({...user, password: e.target.value});
        }} className={styles.input}/>
        <i class= {`bx bx-lock-alt ${styles.icon}`} ></i>
    <button type='submit'>Login</button>
    <div className={styles.links}>
    <Link to='/register'>Register</Link>
    <Link to='/forgot'>Forgot Password</Link>
    </div>
    </div>
    </form>
  )
}

export default login
