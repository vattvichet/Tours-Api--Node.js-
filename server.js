const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('❌ UNCAUGHT EXCEPTION! ', err.name, err.message);
  //Shut down the program
  process.exit(1);
});

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
const server = app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('❌ UNHANDLED REJECTION! ', err.name, err.message);
  //Shut down the program
  server.close(() => {
    process.exit(1);
  });
});

//Test
