const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');
//
const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB Connection successfully');
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});
