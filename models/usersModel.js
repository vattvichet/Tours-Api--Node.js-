const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Username is required!'],
  },
  email: {
    type: String,

    require: [true, 'Email is required!'],
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email!'],
  },
  photo: String,
  password: {
    type: String,
    trim: true,
    require: [true, 'Email is required!'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    trim: true,
    require: [true, 'Email is required!'],
    minLength: 8,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
