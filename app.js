const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json())


const toursInfo = JSON.parse(
    fs.readFileSync('./dev-data/data/tours-simple.json'));


app.get('/', (req, res) => {
    res.status(200).send("Home Page.");
});


app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success', data: {
            tours: toursInfo
        }
    });
});


app.get('/api/v1/tours/:id', (req, res) => {
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
        data: {
            tour: tourInfoByID,
        }
    });
});


app.post('/api/v1/tours', (req, res) => {
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

});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});


app.delete('/api/v1/tours/:id', (req, res) => {
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
});


const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});