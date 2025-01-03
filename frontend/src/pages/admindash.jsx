import React,{useEffect, useState} from 'react'
import styles from './admindash.module.css'
import convertToBase64 from '../convertor/convertToBase64';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const admindash = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [defaultImage, setDefaultImage] = useState('./default.png');
    const [clicked, setClicked] = useState(false);
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [product, setProduct] = useState({name: '', description: '', price: '', image: ''});
    const navigator = useNavigate();
    const [orders, setOrders] = useState([]);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const fetchOrders = async() => {
            const response = await axios.get('http://localhost:5000/purchaseditems');
            setOrders(response.data);
            if(response.data.length > 0){
                const addresses = await axios.get('http://localhost:5000/useraddress');
                setAddresses(addresses.data);
             
                
            }
        }
        fetchOrders();
    }, [orders]);

  return (
    <body className={styles.container}>
       <header>
        <nav className={styles.navbar}>
            <img src="./bg1_1.png" alt="" className={styles.icon}/>
            <div className={styles.profile}>
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
      <div className={styles.statusbar}>
        <div className={styles.orders}>
        <h1>Processing Orders</h1>
        <table className={styles.ordertable}>
            <thead className={styles.ordertablehead}>
                <tr>
                    <td rowSpan={2}>Invoice Number</td> 
                    <td rowSpan={2}>Customer Address</td>
                    <td colSpan={3}>Products</td>
                    <td rowSpan={2}>Total Price</td>
                    <td rowSpan={2}>Action</td>
                </tr>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((item) => (
                <>
                {item.status !== 'Delivered' && item.products.map((product, index) => (
                    <tr key={index}>
                    {index === 0 && (
                        <td rowSpan={item.products.length}>{item.invoice_num}</td>
                    )}
                    <td>{addresses.find(addr => addr._id === item.id)?.address || 'Address not found'}</td>
                    <td>{product.product_name}</td>
                    <td>{product.quantity}</td>
                    <td>{`$${product.total_price}`}</td>
                    {index === 0 && (
                        <>
                        <td rowSpan={item.products.length}>{`$${item.total_price}`}</td>
                        <td rowSpan={item.products.length}>
                        <select value={item.status} onChange={async (e) => {
                            try {
                                await axios.put(`http://localhost:5000/updatestatus/${item.invoice_num}`, {
                                status: e.target.value
                            });
                            } catch (err) {
                                console.error('Error updating status:', err);
                            }
                        }}
                        >
                            {item.status === 'Pending' && <option value="Pending" selected>Pending</option>}
                            <option value="Processing">Processing</option>
                            <option value="Out for Delivery">Out for Delivery</option>  
                        </select>
                        </td>
                        </>
                    )}
                    </tr>
                ))}
                </>
            ))}
            </tbody>
        </table>
        </div>

        <div className={styles.orders}>
        <h1>Finished orders</h1>
        <table className={styles.ordertable}>
            <thead className={styles.ordertablehead}>
                <tr>
                    <td rowSpan={2}>Invoice Number</td>
                    <td rowSpan={2}>Customer Address</td>
                    <td colSpan={3}>Products</td>
                    <td rowSpan={2}>Total Price</td>
                    <td rowSpan={2}>Action</td>
                </tr>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
            {orders.map((item) => (
                <>
                {item.status === 'Delivered' && item.products.map((product, index) => (
                    <tr key={index}>
                    {index === 0 && (
                        <td rowSpan={item.products.length}>{item.invoice_num}</td>
                    )}
                    <td>{addresses.find(addr => addr._id === item.id)?.address || 'Address not found'}</td>
                    <td>{product.product_name}</td>
                    <td>{product.quantity}</td>
                    <td>{`$${product.total_price}`}</td>
                    {index === 0 && (
                        <>
                        <td rowSpan={item.products.length}>{`$${item.total_price}`}</td>
                        <td rowSpan={item.products.length}>{item.status}</td>
                        </>
                    )}
                    </tr>
                ))}
                </>
            ))}
            </tbody>
        </table>
        </div>
      </div>
    </body>
  )
}

export default admindash
