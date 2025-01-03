import express, { json } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { Types } from 'mongoose';
import e from 'cors';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
const { ObjectId } = Types;

mongoose.connect('mongodb://localhost:27017/cartbazaar');

const User = mongoose.model('users', new mongoose.Schema({
    id: String,
    name: String,
    age: Number,
    email: String,
    dob: String,
    address: String,
    username: String,
    password: String,
    role: String,
    pic: {type: String},
}));

const Product = mongoose.model('products', new mongoose.Schema({
    product_name: String,
    product_des: String,
    product_price: Number,
    product_pic: {type: String},
}));

const CartItem = mongoose.model('cartitems', new mongoose.Schema({
    id: String,
    product_name: String,
    quantity: Number,
    total_price: Number,
    date: String,
}));

const PurchasedItem = mongoose.model('purchaseditems', new mongoose.Schema({
    id: String,
    products: [{
        product_name: String,
        quantity: Number,
        total_price: Number
    }],
    total_price: Number,
    date: String,
    invoice_num: String,
    status: String
}));

app.get('/purchaseditems', async (req, res) => {
    const purchases = await PurchasedItem.find({}, { _id: 0, id: 1, products: 1, total_price: 1, date: 1, invoice_num: 1, status: 1 });
    res.send(purchases);
});

app.put('/updatestatus/:invoice_num', async (req, res) => {
    const { invoice_num } = req.params;
    const { status } = req.body;
    try {
        await PurchasedItem.updateOne({ invoice_num }, { $set: { status } });
        res.send('Ok');
    } catch (err) {
        res.status(500).send({ error: "Error updating status", message: err.message });
    }
});

app.get('/useraddress', async (req, res) =>{
    try{
        const address = await User.find({}, {_id: 1, address: 1});
        res.status(200).send(address);
    }catch(err){
        res.status(500).send({error: "Error fetching user address", message: err.message});
    }
});

app.post('/addpurchases', async (req, res) => {
    const { id, random, total } = req.body;
    try {
        const items = await CartItem.find({ id: id }).lean();
        
        const purchase = new PurchasedItem({
            id: id,
            products: items.map(item => ({
                product_name: item.product_name,
                quantity: item.quantity,
                total_price: item.total_price
            })),
            total_price: total,
            date: new Date().toISOString(),
            invoice_num: random,
            status: 'Pending'
        });

        await purchase.save();
        res.send('Ok');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({ error: "Error adding purchases", message: err.message });
    }
});

app.post('/purchaseditems', async (req, res) => {
    const { id } = req.body;   
    const purchases = await PurchasedItem.find({id: id}, { _id: 0, id: 1, products: 1, total_price: 1, date: 1, invoice_num: 1, status: 1 });
    res.send(purchases);
});

app.post('/purchases', async (req, res) => {
    const { id } = req.body;   
    const purchases = await PurchasedItem.find({id: id}, { _id: 0, id: 1, products: 1, total_price: 1, date: 1, invoice_num: 1 });
    res.send(purchases);
});

app.delete('/deleteall/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await CartItem.deleteMany({ id: id });
        res.send('Ok');
    } catch (err) {
        res.status(500).send({ error: "Error deleting all cart items", message: err.message });
    }
});

app.post('/addproduct', async (req, res) => {
    const { name, description, price, image } = req.body;
    try {
        const product = new Product({ product_name: name, product_des: description, product_price: price, product_pic: image});
        await product.save();
        res.send('Ok');
    } catch (err) {
        res.status(500).send({ error: "Error adding product", message: err.message });
    }
});

app.get('/products', async (req, res) => {
    const products = await Product.find({}, { _id: 0, product_name: 1, product_des: 1, product_price: 1, product_pic: 1 });
    res.send(products);
});

app.post('/cart', async (req, res) => {
    const { id } = req.body;
    try {
        const cartItems = await CartItem.find({ id: id }, { _id: 1, product_name: 1, quantity: 1, total_price: 1 });
        res.send(cartItems);
    } catch (err) {
        res.status(500).send({ error: "Error fetching cart items", message: err.message });
    }
});

app.delete('/deletecartitem/:id', async (req, res) => {
    const { id } = req.params;
    const uid = new ObjectId(id);
    try {
        await CartItem.deleteOne({ _id: uid });
        res.send('Ok');
    } catch (err) {
        res.status(500).send({ error: "Error deleting cart item", message: err.message });
    }
});

app.post('/addtocart', async (req, res) => {
    const { id, product_name, quantity, total_price, date } = req.body;
    try {
        const cartItem = new CartItem({ id, product_name, quantity, total_price, date });
        await cartItem.save();
        res.send('Ok');
    } catch (err) {
        res.status(500).send({ error: "Error adding to cart", message: err.message });
    }
});


app.put('/profilepic', async (req, res) => {
    const { id, pic } = req.body;
    const uid = new ObjectId(id);
    try {
        await User.updateOne({ _id: uid }, { $set: { pic }});
        res.send('Ok');
    } catch (err) {
        res.status(500).send({ error: "Error updating profile picture", message: err.message });
    }
});

app.put('/update', async (req, res) => {
    const { id, name, email, address, username } = req.body;
    const uid = new ObjectId(id);
    try {
        await User.updateOne({ _id: uid }, { $set: { name, email, address, username }});
        res.send('Ok');
    } catch (err) {
        res.status(500).send({ error: "Error updating user data", message: err.message });
    }
});

app.put('/updatepassword', async (req, res) => {
    const { id, password } = req.body;
    const uid = new ObjectId(id);
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        await User.updateOne({ _id: uid }, { $set: { password: hashedPassword }});
        res.send('Ok');
    } catch (err) {
        res.status(500).send({ error: "Error updating password", message: err.message });
    }
});

app.post('/dp', async (req, res) => {
    const { id } = req.body;
    const uid = new ObjectId(id);
    try {
        const responce = await User.findOne({ _id: uid }, {_id: 0, pic: 1});
        res.status(200).json({ pic: responce.pic });
    } catch (err) {
        res.status(500).send({ error: "Error fetching profile picture", message: err.message });
    }
});



app.get('/', async (req, res) => {
    const data = await User.find({}, {username: 1, password: 1, _id: 0});
    res.send(data);
});

app.post('/register', async (req, res) =>{

    const {name, age, email, dob, address, username, role, pic} = req.body;
    const password = bcrypt.hashSync(req.body.password, 10, (err, hash) => {
        if(err){
            console.log(err);
        }
        return hash;
    });
    try{
        const user = new User({name, age, email, dob, address, username, password, role, pic});
        await user.save();
        res.send('Ok');
    }catch(err){
        res.send(err);
    }
})


app.post("/user", async (req, res) => {
    const { id } = req.body;
    const uid = new ObjectId(id);

    try {
        const user_id = await User.find({ _id: uid }, { _id: 0, role: 0, pic: 0, dob: 0, age: 0 });
        res.send(user_id);
    } catch (err) {
        res.status(500).send({ error: "Error fetching user data", message: err.message });
    }
});

app.post("address", async (req, res) => {
    const { id } = req.body;
    const uid = new ObjectId(id);

    try {
        const user_id = await User.find({ _id: uid }, { address: 1, _id: 0 });
        res.send(user_id);
    } catch (err) {
        res.status(500).send({ error: "Error fetching user data", message: err.message });
    }
});

app.post("/user_id", async (req, res) => {
    const { id } = req.body;
    const uid = new ObjectId(id);

    try {
        const user_id = await User.find({ _id: uid }, { username: 1, password: 1, _id: 0 });
        res.send(user_id);
    } catch (err) {
        res.status(500).send({ error: "Error fetching user data", message: err.message });
    }
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username : username}, {password: 1, _id: 1, role: 1});
        bcrypt.compare(password, user.password, (err, result) => {
        if(result){
            const token = jwt.sign({username, role: user.role, id:user._id}, 'jwt-secret-key');
            res.cookie('token', token);
            res.status(200).json({message: 'Ok', role: user.role});
        }else{
            res.send('Invalid username or password');
        }
    }); 
    } catch (error) {
        res.send(error);
    }
});
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.send('Ok');

});

app.get('/usernames', async (req, res) => {
    const users = await User.find({}, {username: 1, _id: 0});
    res.send(users);
});

app.get('/auth', async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
        res.status(200).json({ message: "Token is valid", decoded });
    });
});

app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
});