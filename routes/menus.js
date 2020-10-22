const express = require('express');

const router = express.Router();

const MenuController = require('../controllers/MenuController');
const permit = require('../middlewares/persmission');

// All routes has been authenticated at ../start/routes

router.route('/')
  .get(permit.grant('readAny', 'menu'), MenuController.list)
  .post(permit.grant('createAny', 'menu'), MenuController.create);

router.route('/:id')
  .get(permit.grant('readAny', 'menu'), MenuController.detail)
  .all([permit.grant('updateAny', 'menu'), permit.grant('createAny', 'menu')])
  .put(MenuController.update)
  .patch(MenuController.update)
  .delete(permit.grant('deleteAny', 'menu'), MenuController.delete);

module.exports = router;

/**
 *
 * Create body request ...POST/PUT/PATCH
 * {
 *  "name": "some name",
 *  "quantity": 2,
 *  "description": "text not required",
 *  "price": 3
 * }
 */
