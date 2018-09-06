require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
const path = require('path');
const mongoose = require('mongoose')

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const checkLogin = require('./middleware/isLogin') 

const app = express();

//Connect to mongodb
const db = mongoose.connection

mongoose.connect('mongodb://localhost:27017/HacktivGit', {
  useNewUrlParser: true
})
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
