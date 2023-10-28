const express = require('express');
const fs = require('fs');
const app = express();

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


const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});