import React from 'react';
import { useState } from 'react';
import styles from './ProductCard.module.css';
import Default from '/default.png';

const ProductCard = ({ product_name, product_des, product_price }) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={Default}
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
          
          <button className={styles.addToCartButton}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;