const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

var dir = path.join(__dirname, 'public');

const app = express();

app.use(express.static(dir));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use('/public', express.static('public'));
app.use(morgan('dev'));

const usersRoutes = require('./routes/user');
app.use('/api/users', usersRoutes);

const errorMiddleware = require('./middlewares/errorMiddleware');
app.use(errorMiddleware);

module.exports = app;
