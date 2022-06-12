const express = require('express');
require('dotenv').config();
const app = express();
const {PORT} = process.env;
const ejs = require('ejs')
const cookieParser = require('cookie-parser');
const { urlencoded } = require('express');
const morgan = require('morgan');

const userRoute = require('./route/user');
const homeRoute = require('./route/home');

//middleware
app.use(urlencoded({extended: true}))
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(express.json());
//template engine
app.set('view engine', 'ejs');

app.use('/api/upcloud', homeRoute);
app.use('/api/upcloud/users', userRoute);

module.exports = app;