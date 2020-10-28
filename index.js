const express = require('express')
const app = express();
const mongoose = require('mongoose');
const controller = require('./controller');

mongoose.connect('mongodb://localhost:27017/sample_database', () => {
    console.log('database connected')
});

app.use(express.json());
app.use('/api', controller);

app.listen(5000, function () {
    console.log('listening on 5000')
});