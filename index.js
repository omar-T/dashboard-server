require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');

const PORT = process.env.PORT || 8080;

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes go here


// error handling
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});