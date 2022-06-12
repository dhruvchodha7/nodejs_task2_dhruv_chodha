const mongoose = require ('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxLength: [40, 'Name should be under 40 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        validate: [validator.isEmail, 'Please enter email in correct format'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password should be atleast 6 char'],
        select: false
    },
    emailToken:{
        type: String,
    },
    isVerified:{
        type: Boolean
    },
    date:{
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('User', userSchema);