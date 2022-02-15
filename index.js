const express = require('express');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
dotenv.config();
app.set('view engine', 'ejs');



mongoose.connect(process.env.DB_CONNECT,
    () => console.log('connected to the data base')
);

// app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(authRoute)


// app.get("/", (req, res) => {
//     res.render("register")
// })

app.listen(3000, (req,res) => {
    console.log('Port is running on 3000')
});