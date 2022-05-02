const express = require('express');
const logger = require('morgan');
require('dotenv').config();
require('./kafka/adminConsumer');
require('./kafka/answerConsumer');
require('./kafka/commentConsumer');
require('./kafka/messageConsumer');
require('./kafka/questionConsumer');
require('./kafka/tagConsumer');
require('./kafka/userConsumer');
require('./kafka/voteConsumer');
require('./kafka/producer');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.use((err, req, res, next) => {
  console.error('in error handler');
  // set locals, only providing error in development

  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 400).json({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;
