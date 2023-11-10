const express = require('express');
const toursController = require('../controllers/toursController');

const router = express.Router();

//Will be checking if if param id is valid
router.param('id', toursController.checkValidID);


router
    .route('/')
    .get(toursController.getAllTours)
    .post(toursController.checkBody, toursController.createTour);


router
    .route('/:id')
    .get(toursController.getTourByID)
    .patch(toursController.updateTour)
    .delete(toursController.deleteTour);

module.exports = router;