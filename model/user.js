const mongoose = require ('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    income: {
      type: Number,
    },
    maritalStatus: {
      type: String,
    },
    regDate: {
      type: Date,
      default: Date.now,
    },
  });
module.exports = mongoose.model('User', userSchema);