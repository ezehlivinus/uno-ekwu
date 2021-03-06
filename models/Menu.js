const Joi = require('joi');
const mongoose = require('mongoose');
const { ac } = require('../config/roles');

// const ac = new AccessControl();

// Define menu schema
const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },

  description: {
    type: String,
    trim: true
  },

  price: {
    type: Number,
    required: true,
    default: 0
  },
  // when food are ready staff/admin sets
  //  quantity based on how they dishes foods .. a pot can yield 20 plates
  // if quantity is zero, the menu is not available
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
}, { timestamps: new Date() });

menuSchema.set('toJSON', {
  versionKey: false,
  transform(doc, ret) {
    // eslint-disable-next-line no-param-reassign
    // delete ret.field;
  }
});

// Defines Menu model based on menu schema
const Menu = mongoose.model('Menu', menuSchema);

/**
 *
 * @param {object} menu
 */
const validateMenu = async (menu = {}) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string(),
    quantity: Joi.number().required().min(0)
  });

  const value = await schema.validateAsync(menu);
  return value;
};

/**
 * Defines authorization for user roles for model
 * @returns {instance} ac
 */
const authorizations = (() => {
  ac.grant('customer')
    .readAny('menu');

  ac.grant('staff').extend('customer')
    .createAny('menu')
    .updateAny('menu');

  ac.grant('admin').extend('staff')
    .deleteAny('menu');

  return ac;
})();

exports.Menu = Menu;
exports.validateMenu = validateMenu;
exports.roles = authorizations;
