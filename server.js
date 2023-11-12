const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');
//
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB,
  {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify:false,
  useUnifiedTopology:true,
  }
).then(con => {
  console.log("DB Connection successfully");

});

const tourSchema = new mongoose.Schema({
  name:{
    type: String,
    required: ['true', "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: ['true', "A tour must have a price"],
  },
});

const Tour = mongoose.model('Tour',tourSchema);

const testTour = new Tour({
  name:"Tom and Jerry...",
  price:10000,
 
});

testTour.save().then(doc => {
  console.log(doc);
}).catch(err => {
  console.log("ERROR****", err);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});
