const express = require('express');

const router = express.Router();

const OrderController = require('../controllers/OrderController');
const permit = require('../middlewares/persmission');

// All routes has been authenticated at ../start/routes
// orders
router.route('/')
  .get(permit.grant('readOwn', 'order'), OrderController.list)
  .post(permit.grant('createOwn', 'order'), OrderController.create);

router.route('/:id')
  .get(permit.grant('readOwn', 'order'), OrderController.detail)
  .all([permit.grant('updateOwn', 'order')])
  .put(OrderController.update)
  .patch(OrderController.update)
  .delete(permit.grant('deleteAny', 'order'), OrderController.delete);

module.exports = router;

/**
 *
 * Create body request ...POST/PUT/PATCH
 * {
 *  "items": "menuId",
 *  "quantity": 2,
 *  "description": "text not required",
 *  "customerId": "userId",
 *  "address": "delivery address"
 * }
 */
