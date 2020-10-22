/* eslint-disable no-underscore-dangle */
const _ = require('lodash');
const { Menu } = require('../models/Menu');
const { Order } = require('../models/Order');
const { User } = require('../models/User');

/**
 *
 * Retrieve an order
 */
exports.detail = async (req, res) => {
  const order = await Order
    .findById(req.params.id)
    .populate('items');

  if (!order) return res.status(404).send({ status: 'error', message: 'No order found' });

  res.status(200).send({ status: 'success', data: order });
};

/**
 * List/Fetch all order
 */
exports.list = async (req, res) => {
  const orders = await Order.find();

  if (!orders) return res.status(404).send({ status: 'error', message: 'Order not found' });

  res.status(200).send({ status: 'success', data: orders });
};

/**
 * Create a order | place an order
 * For now: customers can only order for a single menu
 * For varieties menus, updates laters
 */
exports.create = async (req, res) => {
  const customer = await User.findById(req.body.customerId);
  if (!customer) return res.status(404).send({ status: 'error', message: 'Customer not found' });

  // later we check if is the logged user that is making the request
  // like doing: req.user._id === req.body.customer

  const menu = await Menu.findById({ _id: req.body.menuId });
  if (!menu) return res.status(404).send({ status: 'error', message: 'Menu not found' });
  if (!menu.quantity) return res.status(404).send({ status: 'error', message: 'This menu has finished' });
  if (req.body.quantity > menu.quantity) {
    return res.status(404).send({
      status: 'error',
      message: `sorry, we only have ${menu.quantity} of this menu remaining`
    });
  }

  const requestBody = _.omit(req.body, ['confirmed']);

  const order = new Order({
    customer: customer._id,
    items: menu._id,
    ...requestBody
  });

  // minus order.quantity from menu.quantity do not save until we successfully place this order
  menu.quantity -= order.quantity;

  await order.save();

  await menu.save();

  return res.status(201).send({
    status: 'success',
    data: order
  });
};

/**
 * Update a order
 */
exports.update = async (req, res) => {
  const customer = await User.findById(req.body.userId);
  if (!customer) return res.status(404).send({ status: 'error', message: 'Not found' });

  const menu = await Menu.findById({ _id: req.params.menuId });
  if (!menu) return res.status(404).send({ status: 'error', message: 'Not found' });
  if (!menu.quantity) return res.status(404).send({ status: 'error', message: 'This menu has finished' });

  if (req.body.quantity > menu.quantity) {
    return res.status(404).send({
      status: 'error',
      message: `sorry, we only have ${menu.quantity} of this menu remaining`
    });
  }

  // deducting and adding to/from menu's or order's quantity will be attended to
  menu.quantity += req.body.quantity;

  const requestBody = _.omit(req.body, ['confirmed']);

  const options = { new: true, runValidators: true };
  await Menu.findByIdAndUpdate(req.params.id, {
    customer: customer._id,
    items: menu._id,
    ...requestBody
  }, options, async (error, order) => {
    if (error) throw error;
    if (!order) return res.status(404).send({ status: 'error', message: 'menu not found' });

    await menu.save();

    res.status(200).send({ status: 'success', data: order });
  });
};

/**
 * Delete a order
 */
exports.delete = async (req, res) => {
  // We shall  check condition of deleting later
  const order = await Order.findByIdAndRemove(req.params.id);

  if (!order) return res.status(404).send({ status: 'error', message: 'order not found' });

  res.status(200).send({ status: 'success', data: order });
};
