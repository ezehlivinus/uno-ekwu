const users = require('../routes/users');
const menus = require('../routes/menus');
const orders = require('../routes/orders');

const auth = require('../middlewares/authentication');

const basePath = '/api/v1';

/**
 * Routes list
 */
module.exports = (app) => {
  app.use(`${basePath}/users`, users);
  app.use(`${basePath}/menus`, [auth, menus]);
  app.use(`${basePath}/orders`, [auth, orders]);
};
