import React,{useState} from 'react'
import styles from './admindash.module.css'
import convertToBase64 from '../convertor/convertToBase64';
import axios from 'axios';

const admindash = () => {
    const [product, setProduct] = useState({name: '', description: '', price: '', image: ''});
  return (
    <body className={styles.container}>
      <div className={styles.register}>
        <img src="./bg1_1.png" className={styles.logo}/>
        <h1>Add Product</h1>
        <form onSubmit={async (e) => {
            e.preventDefault();
            await axios.post('http://localhost:5000/addproduct', product);
        }
        }>
            <div className={styles.inputbox}>
                <label className={styles.nametag}>*Product Name:</label>
                <input className={styles.input} type="text" name="name" placeholder='Product Name' onChange={(e) => {
                    setProduct({...product, name: e.target.value});
                }} required/>
            </div>

            <div className={styles.inputbox}>
                <label className={styles.nametag}>*Product Description:</label>
                <input className={styles.input} type="text" name="name" placeholder='Product Description' onChange={(e) => {
                    setProduct({...product, description: e.target.value});
                }} required/>
            </div>

            <div className={styles.inputbox2}>
            <div className={styles.inputbox}>
                <label className={styles.nametag}>*Product Price:</label>
                <input className={styles.input} type="text" name="name" placeholder='Product Price' onChange={(e) => {
                    setProduct({...product, price: e.target.value});
                }} required/>
            </div>
            <div className={styles.inputbox}>
                <label className={styles.nametag}>*Product Image:</label>
                <input className={styles.input} type="file" name="name" placeholder='Product Image' onChange={async (e) => {
                    const file = e.target.files[0];
                    if(file){
                        const converted = await convertToBase64(file);
                        setProduct({...product, image: converted});
                    }
                }} required/>
            </div>
            </div>
            <div className={styles.inputbox}>
                <button type='submit' className={styles.inputbtn}>Add Product</button>
            </div>
        </form>
      </div>
    </body>
  )
}

export default admindash
