import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import convertToBase64 from '../convertor/convertToBase64';
import defaultPic from '/default.png';
import styles from './profile.module.css';
import { Link } from 'react-router-dom';
const dashboard = () => {
    const navigator = useNavigate();
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [id, setId] = useState(null);
    const [defaultImage, setDefaultImage] = useState(defaultPic);
    const [clicked, setClicked] = useState(false);
    const [userData, setUserdata] = useState({
      name: '', 
      email: '', 
      address: '', 
      username: '', 
      password: '',
    });
    const [usernames, setUsernames] = useState([]);
    const [purchasedItems, setPurchasedItems] = useState([]);

    const fetchUsernames = async () => {
      try {
          const response = await axios.get('http://localhost:5000/usernames');
          setUsernames(response.data.map(user => user.username));
      } catch (error) {
          console.error("Error fetching usernames:", error);
      }
  }
  
    const [password, setPassword] = useState(null);
    const [reenterPassword, setReenterPassword] = useState(null);
    useEffect(() => {
      const fetchAuthStatusAndProfilePic = async () => {
        try {
          const authResponse = await axios.get('http://localhost:5000/auth', { withCredentials: true });
          
          if (authResponse.data.decoded) {
            setUser(authResponse.data.decoded);
            setAuth(true);
            setRole(authResponse.data.decoded.role);
            setId(authResponse.data.decoded.id);
            fetchUsernames();
            
            const userDetails = await axios.post('http://localhost:5000/user', { id: authResponse.data.decoded.id }, { withCredentials: true });
              setUserdata({
                name: userDetails.data[0].name, 
                email: userDetails.data[0].email, 
                address: userDetails.data[0].address, 
                username: userDetails.data[0].username, 
              });    
              
            // Fetch profile picture after authentication succeeds
            const profilePicResponse = await axios.post(
              'http://localhost:5000/dp',
              { id: authResponse.data.decoded.id },
              { withCredentials: true }
            );

            const productsResponse = await axios.post('http://localhost:5000/purchaseditems', { id: authResponse.data.decoded.id });
            setPurchasedItems(productsResponse.data);    
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
    }, [purchasedItems]);
    

    return (
      <div>
      {auth ? 
      <main className={styles.main}>
      <header>
        <nav className={styles.navbar}>
            <img src="./bg1_1.png" alt="" className={styles.icon}/>
            <div className={styles.links}>
              <Link to="/profile" className={styles.link}>Dashboard</Link>
              <Link to="/shop" className={styles.link}>Shop</Link>
            </div>            
            <img src={defaultImage} alt="" className={styles.profilepic} onClick={() => {
              setClicked(!clicked);
            }}/>
        </nav>
        {clicked && <div className={styles.dropdown}>
           <button onClick={async() =>{
              await axios.get('http://localhost:5000/logout');
              setAuth(false);
              setUser(null);
              navigator('/');
            }} className={styles.logout}>Logout</button>
            </div>}
      </header>
      <body className={styles.body}>
        <div className={styles.profileContainer}>
        <div className={styles.pCard}>
        <img src={defaultImage} alt="" />
        <div className={styles.uploadPhoto}>
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
      </div>
      </div>
      <div className={styles.profileForm}>
      <form onSubmit={async (e) => {
        e.preventDefault();
        if(password !== null){
          if(password !== reenterPassword){
            alert('Passwords do not match');
            document.getElementById('reenterPassword').value = '';
          }
        }else{
            if(password !== null){
              await axios.put('http://localhost:5000/updatepassword', {id, password});
              await axios.put('http://localhost:5000/update', {id, userData});
            }else{
              console.log(userData);
              await axios.put('http://localhost:5000/update', {id, userData});
            }
        }
      }}>
     <div className={styles.profile}>
    <h1>Profile</h1>
    <div className={styles.inputbox}>
      <label className={styles.nametag}>*Name:</label>
      <input
        className={styles.input}
        type="text"
        name="name"
        placeholder="Name"
        id="name"
        value={userData.name}
        onChange={(e) => {
          const updatedName = e.target.value;
          setUserdata({ ...userData, name: updatedName });   }}
      />
    </div>
    <div className={styles.inputbox}>
      <label className={styles.nametag}>*Email:</label>
      <input
        className={styles.input}
        type="email"
        name="email"
        placeholder="Email"
        id="email"
        value={userData.email}
        onChange={(e) => {
          const updatedEmail = e.target.value;
          setUserdata({ ...userData, email: updatedEmail });     }}
      />
    </div>
    <div className={styles.inputbox}>
      <label className={styles.nametag}>*Address:</label>
      <input
        className={styles.input}
        type="text"
        name="address"
        placeholder="Address"
        id="address"
        value={userData.address}
        onChange={(e) => {
          const updatedAddress = e.target.value;
          setUserdata({ ...userData, address: updatedAddress });
        }}
      />
    </div>
    <div className={styles.inputbox}>
      <label className={styles.nametag}>*Username:</label>
      <input
        className={styles.input}
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        value={userData.username}
        onChange={(e) => {
          {
          const updatedUsername = e.target.value;
          if(usernames.includes(updatedUsername)){
            alert('Username already exists');
            document.getElementById('username').value = '';}
          else{
            setUserdata({ ...userData, username: updatedUsername });            }
          }
        }}
      />
    </div>
    <div className={styles.inputbox2}>
      <div className={styles.inputbox}>
        <label className={styles.nametag}>*Password:</label>
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className={styles.inputbox}>
        <label className={styles.nametag}>*Re-enter Password:</label>
        <input
          className={styles.input}
          type="password"
          id="reenterPassword"
          name="reenterPassword"
          placeholder="Re-enter Password"
          onChange={(e) => {
            setReenterPassword(e.target.value);
          }}
        />
      </div>
    </div>
    <div className={styles.inputbox}>
      <button className={styles.inputbtn} type="submit">
        Update
      </button>
    </div>
  </div>
      </form>
      
      </div>
        </div>
      <div className={styles.purchases}>
      <h1>My Orders</h1>
      <table className={styles.purchasesTable}>
        <thead className={styles.purchasesTableHead}>
          <tr>
            <th rowspan="2">Invoice Number</th>
            <th colspan="3" class="products-header">Products</th>
            <th rowspan="2">Total Price</th>
            <th rowspan="2">Status</th>
          </tr>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {purchasedItems.map((item) => (
            <>
              {item.products.map((product, index) => (
                <tr key={index}>
                  {index === 0 && (
                    <td rowSpan={item.products.length}>{item.invoice_num}</td>
                  )}
                  <td>{product.product_name}</td>
                  <td>{product.quantity}</td>
                  <td>{`$${product.total_price}`}</td>
                  {index === 0 && (
                    <>
                      <td rowSpan={item.products.length}>{`$${item.total_price}`}</td>
                      
                      {(item.status === "Out for Delivery") ? <select className={styles.opt} value={item.status} onChange={async (e) => {
                            try {
                                await axios.put(`http://localhost:5000/updatestatus/${item.invoice_num}`, {
                                status: e.target.value
                            });
                            } catch (err) {
                                console.error('Error updating status:', err);
                            }
                        }}
                        >
                            <option value="Out for Delivery">Out for Delivery</option>  
                            <option value="Delivered">Delivered</option>
                        </select> :
                        <td rowSpan={item.products.length}>{item.status}</td>}
                    </>
                  )}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
      </div>
      </body>
      </main>
       : 
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
