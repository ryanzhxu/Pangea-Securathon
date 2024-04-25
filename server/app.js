var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(require('path').join(__dirname, 'public')));
app.use(require('./routes/patients'));
app.use(require('./routes/physicians'));
app.use(require('./routes/authentication'));

require('mongoose').connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@medisynccluster.rht3tp8.mongodb.net/medisyncDB?retryWrites=true&w=majority`
);

app.listen(3000, () => {
  console.log('Server is running...');
});

module.exports = app;
