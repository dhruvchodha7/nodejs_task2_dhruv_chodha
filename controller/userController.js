const User = require('../model/user')
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const mailHelper = require('../config/mailHelper');
require('dotenv').config();


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRY
    });
}

exports.register = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email: email});
        const myEncPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: myEncPassword,
            emailToken: crypto.randomBytes(64).toString('hex'),
            isVerified: false,
        })
        await user.save();
        
        res.status(200).json({
            name: user.name,
            email: user.email,
            success: true,
            message: "user successfully registered"
        }) 
        user.password = undefined;
        mailHelper(user, req);

    }catch(error){
        console.log(error);
    }

}

exports.registerScreen = async(req, res)=>{
    res.render('register');
}

exports.login = async(req, res)=>{
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            const match = bcrypt.compare(password, existingUser.password);
            if(match){
                const token = createToken(existingUser.id)
                res.cookie('access-token', token)
                res.redirect('/dashboard');
                res.status(200).json({
                    success: true,
                    msg: "User Logged In"
                })
            }else{
                console.log('Invalid Password');
            }
            
        }else{
            console.log('User not registered ')
        }
    } catch (error) {
        console.log(error);
    }
}

exports.loginScreen = (req, res) => {
    res.render('login');
}

exports.listUsers = async(req, res) => {
    try {
        const users = await User.find().select('name age email');
        res.json(users);
      } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
      }
}

exports.verifyEmail = async(req, res) => {
    try{
        const token = req.query.token;
        const user = await User.findOne({emailToken: token});
        if(user){
            user.emailToken = null;
            user.isVerified = true;
            await user.save();
            res.status(200).json({
                name: user.name,
                verified: user.isVerified,
                success: true
            })
        }else{
            console.log("email is not verified")
            res.status(400).json({
                name: user.name,
                verified: user.isVerified,
                success: false
            })
        }
    }catch(error){
        console.log(error);
    }
        
}