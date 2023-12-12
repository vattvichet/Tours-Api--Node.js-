const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Username is required!'],
  },
  email: {
    type: String,
    unique: true,
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
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
    minLength: 8,
  },
});

userSchema.pre('save', async function (next) {
  //Password Fill is changed or saved
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
