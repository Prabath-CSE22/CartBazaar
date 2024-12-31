import React, {useEffect, useState} from 'react'
import styles from './cartItem.module.css'
import axios from 'axios'

const CartItem = ({id, product_name, quantity, total }) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.itemDetails}>
        <div className={styles.itemImage}>
          <h3>{product_name}</h3>
          <div className={styles.itemMeta}>
            <span>
              <i className='bx bx-package'></i>
              Quantity: {quantity}
            </span>
            <span>
              <i className='bx bx-dollar'></i>
              Total: ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <button 
        className={styles.delbtn}
        aria-label="Remove item"
        onClick={async () => {
          await axios.delete(`http://localhost:5000/deletecartitem/${id}`);
        }}
      >
        <i className='bx bx-trash'></i>
      </button>
    </div>
  )
}

export default CartItem