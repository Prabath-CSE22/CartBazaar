import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './register.module.css'
const register = () => {
    const [user, setUser] = useState({name: '', age: '', email: '', dob: '', address: '', username: '', password: '', role: 'user', pic: ''});
    const [password, setPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');
    const navigate = useNavigate();

    const ageCalculator = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    }
    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
        const fetchUsernames = async () => {
            try {
                const response = await axios.get('http://localhost:5000/usernames');
                // Directly map the response data and set the usernames
                setUsernames(response.data.map(user => user.username));
            } catch (error) {
                console.error("Error fetching usernames:", error);
            }
        }
        fetchUsernames();
    }, [])
return (
    <body className={styles.container}>
        <div className={styles.register}>
            <img src="./bg1_1.png" className={styles.logo}/>
        <h1>Register</h1>
        <form onSubmit={async (e)=>{
            e.preventDefault();
            if(password !== reenterPassword){
                alert('Passwords do not match');
                document.getElementById('reenterPassword').value = '';
            }else if(usernames.includes(user.username)){
                alert('Username already exists');
                document.getElementById('username').value = '';
            }else{
                const updatedUser = {...user, password};
                const response = await axios.post('http://localhost:5000/register', updatedUser);
                if(response.data === 'Ok'){
                    navigate('/');
                }
            }
        }}>
            <div className={styles.inputbox}>
                <label className={styles.nametag}>*Name:</label>
                <input className={styles.input} type="text" name="name" placeholder='Name' onChange={(e) => {
                    setUser({...user, name: e.target.value});
                }} required/>
            </div>
            <div className={styles.inputbox}>
                <label className={styles.nametag}>*Email:</label>
                <input className={styles.input} type="email" name="email" placeholder='Email' onChange={(e) =>{
                    setUser({...user, email: e.target.value});
                }} required/>
            </div>
            <div className={styles.inputbox2}>
                <div className={styles.inputbox}>
                <label className={styles.nametag}>*Date of Birth:</label>
                <input className={styles.input} type="date" name="dob" placeholder='Date of Birth' onChange={(e) =>{
                    setUser({...user, dob: e.target.value});
                    document.getElementById('age').value = ageCalculator(e.target.value);
                    setUser({...user, age: ageCalculator(e.target.value)});
                }} />
                </div>

                <div className={styles.inputbox}>
                    <label className={styles.nametag}>*Age:</label>
                    <input className={styles.input} type="number" name="age" id='age' placeholder='Age' onChange={(e) =>{
                        setUser({...user, age: e.target.value});
                    }} />
                </div>
            </div>
            <div className={styles.inputbox}>
                <label className={styles.nametag}>*Address:</label> 
                <input className={styles.input} type="text" name="address" placeholder="Address" onChange={(e) =>{
                    setUser({...user, address: e.target.value});
                }} required/>
            </div>
            <div className={styles.inputbox}>
                <label className={styles.nametag}>*Username:</label>
                <input className={styles.input} type="text" id='username' name="username" placeholder='username' onChange={(e) =>{
                    setUser({...user, username: e.target.value});
                }} required/>
            </div>
            <div className={styles.inputbox2}>
                <div className={styles.inputbox}>
                    <label className={styles.nametag}>*Password:</label>
                    <input className={styles.input} type="password" name="password" placeholder='password' onChange={(e) =>{
                        setPassword(e.target.value);
                    }} required/>
                </div>
                <div className={styles.inputbox}>
                    <label className={styles.nametag}>*Re-enter Password:</label>
                    <input className={styles.input} type="password" id='reenterPassword' name="reenterPassword" placeholder="re-enter assword"onChange={(e) =>{
                        setReenterPassword(e.target.value);
                    }} required/>
                </div>
            </div>

            <div className={styles.inputbox}>
                <button className={styles.inputbtn} type="submit">Register</button>
            </div>
        </form>
    </div>
    </body>
)
}

export default register
