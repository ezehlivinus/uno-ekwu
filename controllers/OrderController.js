/* eslint-disable no-underscore-dangle */
const { Menu } = require('../models/Menu');
const { Order } = require('../models/Order');
const { User } = require('../models/User');

/**
 *
 * Retrieve an order
 */
exports.detail = async (req, res) => {
  const order = await Order.findById(req.params.id);
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
 * Create a menu
 */
exports.create = async (req, res) => {
  // validate req.body ... to be done

  // we may need to find a menu, and make sure that it does not exist
  // But the problem is that menu may not have a unique filed until then it shall be implemented

  const customer = await User.findById(req.body.userId);
  if (!customer) return res.status(404).send({ status: 'error', message: 'Not found' });

  const menu = await Menu.findById({ _id: req.params.menuId });
  if (!menu) return res.status(404).send({ status: 'error', message: 'Not found' });

  const order = new Order({
    customer: customer._id,
    items: menu._id,
    ...req.body
  });

  await order.save();

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

  const options = { new: true, runValidators: true };
  await Menu.findByIdAndUpdate(req.params.id, {
    customer: customer._id,
    items: menu._id,
    ...req.body
  }, options, async (error, order) => {
    if (error) throw error;
    if (!order) return res.status(404).send({ status: 'error', message: 'menu not found' });

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
