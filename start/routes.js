// require your routes here
// example: const users = require('../routes/users')

const users = require('../routes/users');
const menus = require('../routes/menus');

const auth = require('../middlewares/authentication');

const basePath = '/api/v1';

/**
 * Routes list
 */
module.exports = (app) => {
  app.use(`${basePath}/users`, users);
  app.use(`${basePath}/menus`, [auth, menus]);
};
