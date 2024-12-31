import React, { useEffect, useState } from 'react'
import styles from './cart.module.css'
import CartItem from './cartItem'
import axios from 'axios'

const Cart = ({id}) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    
   useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await axios.post('http://localhost:5000/cart', { id: id });
        setCart(cartItems.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCartItems();   
    }, [cart]);
  return (
    <div className={styles.cart}>
        <h2>Cart</h2>
        
        <div className={styles.cartItems}>
        {useEffect(() => {
          const newTotal = cart.reduce((sum, item) => sum + item.total_price, 0);
          setTotal(newTotal);
        }, [cart])}
        {cart.map((item) => (
          <CartItem
            key={item._id}
            id={item._id}
            product_name={item.product_name}
            quantity={item.quantity}
            total={item.total_price}
          />
        ))}
        </div>
      <div className={styles.total}>
        <h3>Total: </h3>
        <h3>${total.toFixed(2)}</h3>
      </div>
      <button className={styles.cartbtn}>Purchase</button>
    </div>
  )
}

export default Cart
