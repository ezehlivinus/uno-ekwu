const Joi = require('joi');
const mongoose = require('mongoose');
const { ac } = require('../config/roles');

// Define order schema
const orderSchema = new mongoose.Schema({
// to be made an array
  items: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  },

  quantity: {
    type: Number,
    required: true,
    default: 0
  },

  description: {
    type: String
  },

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  address: {
    type: String,
    required: true,
    trim: true
  }
});

orderSchema.set('toJSON', {
  versionKey: false
});

// Defines Menu model based on menu schema
const Order = mongoose.model('Order', orderSchema);

const authorizations = (() => {
  ac.grant('customer')
    .readOwn('order')
    .updateOwn('order')
    .createOwn('order');

  ac.grant('staff').extend('customer')
    .readAny('order')
    .updateAny('order');

  ac.grant('admin').extend('staff')
    .deleteAny('order');

  return ac;
})();

exports.Order = Order;
exports.roles = authorizations;
