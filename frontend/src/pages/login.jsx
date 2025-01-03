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
    <div>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/login', user);
        console.log(response);
        
        if(response.data.message === 'Ok' && response.data.role === 'user'){
            navigate('/shop');
        }else if(response.data.message === 'Ok' && response.data.role === 'admin'){
            navigate('/admin');
        }else{
            alert('Invalid username or password');
        }
    }} className={styles.lform}>
      <img src="./bg1_1.png" className={styles.logo}/>
      <h1>Login</h1>
      <div className={styles.inputbox}>
        <label className={styles.nametag}>*Username:</label>
        <input type="text" placeholder='username' onChange={(e) => {
            setUser({...user, username: e.target.value});
          }} className={styles.input}/>
          <i className={`bx bx-user ${styles.icon}`}></i>
        
        <label className={styles.nametag}>*Password:</label>
          <input type="password" placeholder='password' onChange={(e) => {
            setUser({...user, password: e.target.value});
        }} className={styles.input}/>
        <i class= {`bx bx-lock-alt ${styles.icon}`} ></i>
    <button type='submit'>Login</button>
    <div className={styles.links}>
    <Link to='/register' className={styles.link}>Register</Link>
    <Link to='/forgot' className={styles.link}>Forgot Password</Link>
    </div>
    </div>
    </form>
    
    </div>

    
  )
}

export default login
