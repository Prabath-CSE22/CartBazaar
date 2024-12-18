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
    dob: Date,
    address: String,
    username: String,
    password: String,
    role: String,
    pic: {type: String},
}));

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
            const token = jwt.sign({username, role: user.role, id:user._id}, 'jwt-secret-key', {expiresIn: '10m'});
            res.cookie('token', token);
            res.send('Ok');
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