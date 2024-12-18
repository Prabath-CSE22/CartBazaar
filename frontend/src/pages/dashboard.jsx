import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import convertToBase64 from '../convertor/convertToBase64';
import defaultPic from '/default.png';
import styles from './dashboard.module.css';
const dashboard = () => {
    const navigator = useNavigate();
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [id, setId] = useState(null);
    const [defaultImage, setDefaultImage] = useState(defaultPic);
    
    useEffect(() => {
      const fetchAuthStatusAndProfilePic = async () => {
        try {
          // Fetch authentication status
          const authResponse = await axios.get('http://localhost:5000/auth', { withCredentials: true });
          
          if (authResponse.data.decoded) {
            setUser(authResponse.data.decoded);
            setAuth(true);
            setRole(authResponse.data.decoded.role);
            setId(authResponse.data.decoded.id);
    
            // Fetch profile picture after authentication succeeds
            const profilePicResponse = await axios.post(
              'http://localhost:5000/dp',
              { id: authResponse.data.decoded.id },
              { withCredentials: true }
            );
            const image = profilePicResponse.data.pic;
            if (image !== '') {
              setDefaultImage(image);
            }
          } else {
            setAuth(false);
          }
        } catch (error) {
          console.error('Error:', error);
          setAuth(false);
        }
      };
    
      fetchAuthStatusAndProfilePic();
    }, []);
    

    return (
      <div>
      {auth ? 
      <div>
      <h1>Dashboard {role}</h1>
      <label htmlFor="profile"> 
        <img src={defaultImage} alt="" className={styles.profile_pic}/>
      </label>
      <input type="file" id="profile" onChange={async (e) => {
        const file = e.target.files[0];
        if (file) {
          const base64Image = await convertToBase64(file);
          setDefaultImage(base64Image);
          console.log(`Uploading profile picture...${file.name}`);
        }
      }} />
      <button onClick={async () => {
        await axios.put('http://localhost:5000/profilepic', { id, pic: defaultImage });
      }}>Upload</button>

      <button onClick={async() =>{
      await axios.get('http://localhost:5000/logout');
      setAuth(false);
      setUser(null);
      navigator('/');
      }}>Logout</button>
      </div> : 
      <div>
      <h1>Not Authorized</h1>
      <button onClick={() => {
        console.log('Redirecting to login...');
        navigator('/');
      }}>Login</button>
      </div>
      }
      </div>
    )
}
export default dashboard
