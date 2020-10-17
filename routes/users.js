const express = require('express');

const router = express.Router();

const UserController = require('../controllers/UserController');
const auth = require('../middlewares/authentication');
const permit = require('../middlewares/persmission');

router.post('/login', UserController.login);

router.route('/')
  .get([auth, permit.grant('readOwn', 'userAccount')], UserController.list)
  .post(UserController.create);

router.route('/:id').all([auth])
  .get([permit.grant('readOwn', 'userAccount')], UserController.detail)
  .put([permit.grant('readOwn', 'userAccount')], UserController.update)
  .patch([permit.grant('readOwn', 'userAccount')], UserController.update)
  .delete([auth, permit.grant('deleteAny', 'userAccount')], UserController.delete);

module.exports = router;
