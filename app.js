const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const toursInfo = JSON.parse(
    fs.readFileSync('./dev-data/data/tours-simple.json')

);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success', data: {
            tours: toursInfo
        }
    });
});

var items = [];
app.post('/api/v1/tours', (req, res) => {
    var item = req.body;
    console.log(item);
    items.push(item);
    res.status(404).send("Item added successfully.");
});


const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});