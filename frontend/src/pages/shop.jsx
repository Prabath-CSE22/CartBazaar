import ProductCard from '../components/productCard'
import styles from './shop.module.css'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import defaultPic from '/default.png';
import { Link } from 'react-router-dom';
import Cart from '../components/cart';
const shop = () => {
  const navigator = useNavigate();
  const [user, setUser] = useState(null);
      const [auth, setAuth] = useState(false);
     const [role, setRole] = useState(null);
     const [id, setId] = useState(null);
    const [isClicked, setisClicked] = useState(false);
    const [defaultImage, setDefaultImage] = useState(defaultPic);
    const [clicked, setClicked] = useState(false);
    
  const [userData, setUserdata] = useState({
        name: '', 
        email: '', 
        address: '', 
        username: '', 
        password: '',
      });
    
      const [cartOpen, setCartOpen] = useState(false);

      const [products, setProducts] = useState([]);

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

            const productsResponse = await axios.get('http://localhost:5000/products');
            setProducts(productsResponse.data);

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
    }, [products]);
    
  return (
    <body className={styles.shopPageBody}>
      <header>
        <nav className={styles.navbar}>
            <img src="./bg1_1.png" alt="" className={styles.icon}/>
            <div className={styles.links}>
              <Link to="/profile" className={styles.link}>Dashboard</Link>
              <Link to="/shop" className={styles.link}>Shop</Link>
            </div>            
            <div className={styles.profile}>
              <i className={`bx bx-cart-alt ${styles.cartIcon}`} onClick={() => {
                setCartOpen(!cartOpen);
                {clicked && setClicked(false);}
              }}></i>
              <img src={defaultImage} alt="" className={styles.profilepic} onClick={() => {
                setClicked(!clicked);
                {cartOpen && setCartOpen(false);}
              }}/>
            </div>
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
      <section className={styles.shopSection} onClick={() => {
              if(clicked) {
                setClicked(false);
              }else if(cartOpen) {
                setCartOpen(false);
              }
            }}>
      {
        products.map((product) => (
          <ProductCard
            key={product.id}
            id={id}
            product_name={product.product_name}
            product_des={product.product_des}
            product_price={product.product_price}
            productImage={product.product_pic}
          />
        ))
      }
      </section>
      {cartOpen && <Cart id={id} isClicked={isClicked} setIsClicked={setisClicked}/>}
    </body>
  )
}

export default shop
