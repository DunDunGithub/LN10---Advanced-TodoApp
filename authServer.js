const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

dotenv.config();

const PORT = 6869;

app.use(express.json());
app.use(cors()); 

app.post('/login', (req, res) => {
    const {username, password} = req.body;

    if(username === process.env.USERNAME && password === process.env.PASSWORD) {
        const accessToken = jwt.sign({username: 'admin'}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '2m'})
        res.json({accessToken})
    }
    else{
        res.sendStatus(400)
        .json({message: "Username or password does not match"})
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});