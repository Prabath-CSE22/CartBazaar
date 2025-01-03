import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './ProductCard.module.css';
import Default from '/default.png';
import axios from 'axios';

const ProductCard = ({ id, product_name, product_des, product_price, productImage }) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10).replace('T', ' '));
  const [order, setOrder] = useState({id:id, product_name: product_name, quantity: 0, total_price: 0, date: ''});
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setOrder({id:id, product_name: product_name, quantity: quantity, total_price: quantity * product_price, date: date});
  }, [quantity]);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={productImage || Default}
          alt={product_name}
          className={styles.productImage}
        />
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.productName}>{product_name}</h3>
        <p className={styles.productDescription}>{product_des}</p>
        <div className={styles.productPrice}>${product_price}</div>
        
        <div className={styles.actions}>
          <div className={styles.quantityContainer}>
            <span className={styles.quantityLabel}>Quantity</span>
            <div className={styles.quantityControls}>
              <button
                onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
                className={styles.quantityButton}
              >
                -
              </button>
              
              <span className={styles.quantityValue}>{quantity}</span>
              
              <button
                onClick={() => setQuantity(quantity + 1)}
                className={styles.quantityButton}
              >
                +
              </button>
            </div>
          </div>
          
          <button className={styles.addToCartButton} onClick={async() => {
              { quantity > 0 && await axios.post('http://localhost:5000/addtocart', order)
              setQuantity(0);}
            }
            }>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;