const express = require('express');
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createUser);

router
  .route('/:id')
  .get(usersController.getUserByID)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
