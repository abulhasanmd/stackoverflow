const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 100,
};
mongoUrl = "mongodb+srv://admin:admin@cluster0.lxwco.mongodb.net/stackoverflow-db?retryWrites=true&w=majority"
mongoose.connect(mongoUrl, options, (err, res) => {
  if (err) {
    console.error('MongoDB Connection Failed');
    console.error(err);
  } else {
    console.log('MongoDB Connected');
  }
});

let QModel = mongoose.model('Question', {})
async function getQuestions(){
    var results = await QModel.count({})//.batchSize(10000)
    console.log("results : ", results)
}
getQuestions();