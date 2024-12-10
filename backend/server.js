import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';   

const saltRounds = 10;
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const db = mongoose.connect('mongodb://localhost:27017/cartbazaar');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const user = mongoose.model('user', userSchema);

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const getpassword = await user.findOne({username}, {password: 1, _id: 0});
    bcrypt.compare(password, getpassword.password, (err, result) => {
        if (err) {
            res.json({status: 'error'});
        }
        if (result){
            const token = jwt.sign({username}, 'jwt-secret-key', {expiresIn: '2m'});
            res.cookie('token', token);
            return res.json({status: 'ok'});
        }else{
            res.json({status: 'error'});
        }
    });
});

app.get('/auth', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({status: 'error'});
    }
    try {
        const decoded = jwt.verify(token, 'jwt-secret-key');
        const username = decoded.username;
        return res.json({status: 'ok', username: username});
    } catch (error) {
        return res.json({status: 'error'});
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({status: 'ok'});
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            console.error(err);
            return;
        }
        const newUser = new user({username, password: hash});
        await newUser.save();
        res.json({status: 'ok'});
    });
});

app.listen(5000, () => {
    console.log('Server started at http://localhost:5000');
    if (db) {
        console.log('Database connected');
    } else {
        console.log('Database connection error');
    }
});