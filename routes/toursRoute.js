const express = require('express');
const toursController = require('../controllers/toursController');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(toursController.aliasTopTours, toursController.getAllTours);

router.route('/tour-stats').get(toursController.getStats);

router
  .route('/')
  .get(toursController.getAllTours)
  .post(toursController.createTour);

router
  .route('/:id')
  .get(toursController.getTourByID)
  .patch(toursController.updateTour)
  .delete(toursController.deleteTour);

module.exports = router;
