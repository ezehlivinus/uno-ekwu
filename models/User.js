const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { SECRET } = require('../config/env');
const { ac } = require('../config/roles');


// Define user schema
const userSchema = new mongoose.Schema({

  name: {
    type: String, required: true, minlength: 2, maxlength: 100
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 60
  },

  role: {
    type: String,
    lowercase: true,
    enum: ['customer', 'staff', 'admin'],
    default: 'customer',
    required: true
  }

}, { timestamps: new Date() });

// Tells which user properties that are included when converting MongoDB records to
// JSON objects which are returned in API responses
userSchema.set('toJSON', {
  versionKey: false,
  transform(doc, ret) {
    // eslint-disable-next-line no-param-reassign
    delete ret.password;
  }
});

// Define static method to be used on User object
userSchema.methods.generateAuthToken = function t() {
  const token = jwt.sign({
    _id: this._id,
    email: this.email,
    role: this.role
  }, SECRET, { expiresIn: '7 days' });

  return token;
};

// Define User model based on user schema
const User = mongoose.model('User', userSchema);

// validation
const validateUser = async (user = {}) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    password: Joi.string().min(6).max(60).required(),
    email: Joi.string().email().trim().lowercase()
      .required()
  });

  const value = await schema.validateAsync(user);

  return value;
};

// validation
const validateUpdate = async (user = {}) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100),
    password: Joi.string().min(6).max(60),
    email: Joi.string().email().trim().lowercase()
  });

  const value = await schema.validateAsync(user);

  return value;
};

const authorisations = (() => {
  ac.grant('customer')
    .readOwn('userAccount')
    .updateOwn('userAccount');

  ac.grant('staff').extend('customer')
    .readAny('userAccount')
    .createAny('userAccount');

  ac.grant('admin').extend('staff')
    .updateAny('userAccount')
    .deleteAny('userAccount');

  return ac;
})();

exports.validateUser = validateUser;
exports.User = User;
exports.validateUpdate = validateUpdate;
exports.authorisations = authorisations;
