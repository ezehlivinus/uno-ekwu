const { validateMenu, Menu } = require('../models/Menu');

/**
 *
 * Retrieve a menu
 */
exports.detail = async (req, res) => {
  const menu = await Menu.findById(req.params.id);
  if (!menu) return res.status(404).send({ status: 'error', message: 'No menu found' });

  res.status(200).send({ status: 'success', data: menu });
};

/**
 * List/Fetch all menus
 */
exports.list = async (req, res) => {
  const menus = await Menu.find();

  if (!menus) return res.status(404).send({ status: 'error', message: 'Menu not found' });

  res.status(200).send({ status: 'success', data: menus });
};

/**
 * Create a menu
 */
exports.create = async (req, res) => {
  // validate req.body
  const validData = await validateMenu(req.body);

  // we may need to find a menu, and make sure that it does not exist
  // But the problem is that menu may not have a unique filed until then it shall be implemented

  const menu = new Menu({ ...validData });

  await menu.save();

  return res.status(201).send({
    status: 'success',
    data: menu
  });
};

/**
 * Update a menu
 */
exports.update = async (req, res) => {
  const validData = await validateMenu(req.body);

  const options = { new: true, runValidators: true };
  await Menu.findByIdAndUpdate(req.params.id, {
    ...validData
  }, options, async (error, menu) => {
    if (error) throw error;
    if (!menu) return res.status(404).send({ status: 'error', message: 'menu not found' });

    res.status(200).send({ status: 'success', data: menu });
  });
};

/**
 * Delete a menu
 */
exports.delete = async (req, res) => {
  const menu = await Menu.findByIdAndRemove(req.params.id);

  if (!menu) return res.status(404).send({ status: 'error', message: 'menu not found' });

  res.status(200).send({ status: 'success', data: menu });
};
