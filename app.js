const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json())


const toursInfo = JSON.parse(
    fs.readFileSync('./dev-data/data/tours-simple.json'));


const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success', data: {
            tours: toursInfo
        }
    });
}

const createTour = (req, res) => {
    const newID = toursInfo.length + 1;
    const newTour = Object.assign({ id: newID, }, req.body);
    toursInfo.push(newTour);
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(toursInfo), (err, data) => {
        res.status(201).json({
            status: 'success',
            data: {
                tours: newTour,
            }
        });
    });

}

const getTourByID = (req, res) => {
    const id = req.params.id * 1;
    const tourInfoByID = toursInfo.find(item => item.id === id);

    // if (id > toursInfo.length) {
    if (!tourInfoByID) {
        return res.status(404).json({
            status: "Fail",
            message: "Invalid ID"
        });
    }
    res.status(200).json({
        status: 'success',
        requestTime: req.requestTime,
        data: {
            tour: tourInfoByID,
        }
    });
}





const updateTour = (req, res) => {
    const id = req.params.id * 1;
    const tourInfoByID = toursInfo.find(item => item.id === id);

    // if (id > toursInfo.length) {
    if (!tourInfoByID) {
        return res.status(404).json({
            status: "Fail",
            message: "Invalid ID"
        });
    }
    res.status(200).json({
        status: "success",
        data: {
            tour: '<Updated tour here>'
        }
    });
}


const deleteTour = (req, res) => {
    const id = req.params.id * 1;
    const tourInfoByID = toursInfo.find(item => item.id === id);

    // if (id > toursInfo.length) {
    if (!tourInfoByID) {
        return res.status(404).json({
            status: "Fail",
            message: "Invalid ID"
        });
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
}

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This api route is not defined yet!'
    });
}
const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This api route is not defined yet!'
    });
}
const getUserByID = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This api route is not defined yet!'
    });
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This api route is not defined yet!'
    });
}
const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This api route is not defined yet!'
    });
}

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app
    .route('/api/v1/tours/:id')
    .get(getTourByID)
    .patch(updateTour)
    .delete(deleteTour);

app
    .route('/api/v1/users')
    .get(getAllUsers)
    .post(createUser);

app
    .route('/api/v1/users/:id')
    .get(getUserByID)
    .patch(updateUser)
    .delete(deleteUser);





const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});