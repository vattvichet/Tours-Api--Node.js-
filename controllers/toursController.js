
const fs = require('fs');

const toursInfo = JSON.parse(
    fs.readFileSync('./dev-data/data/tours-simple.json'));

exports.checkValidID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    const id = req.params.id * 1;
    const tourInfoByID = toursInfo.find(item => item.id === id);
    // if (id > toursInfo.length) {
    if (!tourInfoByID) {
        return res.status(404).json({
            status: "Fail",
            message: "Invalid ID"
        });
    }
    next();
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success', data: {
            tours: toursInfo
        }
    });
}
exports.createTour = (req, res) => {
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

exports.getTourByID = (req, res) => {
    const id = req.params.id * 1;
    res.status(200).json({
        status: 'success',
        requestTime: req.requestTime,
        data: {
            tour: toursInfo[id],
        }
    });
}


exports.updateTour = (req, res) => {

    res.status(200).json({
        status: "success",
        data: {
            tour: '<Updated tour here>'
        }
    });
}


exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: "success",
        data: null,
    });
}
