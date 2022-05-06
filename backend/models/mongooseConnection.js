const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: process.env.maxPoolSize,
};

mongoose.connect(process.env.mongoUrl, options, (err, res) => {
  if (err) {
    console.error('MongoDB Connection Failed');
    console.error(err);
  } else {
    console.log('MongoDB Connected');
  }
});

module.exports = mongoose;
