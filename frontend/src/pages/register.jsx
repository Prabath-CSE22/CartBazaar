import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const register = () => {
    const [user, setUser] = useState({name: '', age: '', email: '', dob: '', address: '', username: '', password: '', role: 'user'});
    const [password, setPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');
    const navigate = useNavigate();

    const ageCalculator = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    }
return (
    <div>
        <h1>Register</h1>
        <form onSubmit={async (e)=>{
            e.preventDefault();
            if(password !== reenterPassword){
                alert('Passwords do not match');
            }else{
                const updatedUser = {...user, password};
                const response = await axios.post('http://localhost:5000/register', updatedUser);
                if(response.data === 'Ok'){
                    navigate('/login');
                }
            }
        }}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" onChange={(e) => {
                    setUser({...user, name: e.target.value});
                }} required/>
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" onChange={(e) =>{
                    setUser({...user, email: e.target.value});
                }} required/>
            </div>
            <div>
                <label>Date of Birth:</label>
                <input type="date" name="dob" onChange={(e) =>{
                    setUser({...user, dob: e.target.value});
                    document.getElementById('age').value = ageCalculator(e.target.value);
                    setUser({...user, age: ageCalculator(e.target.value)});
                }} />
            </div>
            <div>
                <label>Age:</label>
                <input type="number" name="age" id='age' onChange={(e) =>{
                    setUser({...user, age: e.target.value});
                }} />
            </div>
            <div>
                <label>Address:</label> 
                <input type="text" name="address" onChange={(e) =>{
                    setUser({...user, address: e.target.value});
                }} required/>
            </div>
            <div>
                <label>Username:</label>
                <input type="text" name="username" onChange={(e) =>{
                    setUser({...user, username: e.target.value});
                }} required/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" onChange={(e) =>{
                    setPassword(e.target.value);
                }} required/>
            </div>
            <div>
                <label>Re-enter Password:</label>
                <input type="password" name="reenterPassword" onChange={(e) =>{
                    setReenterPassword(e.target.value);
                }} required/>
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
)
}

export default register
