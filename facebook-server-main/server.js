const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cron = require('node-cron');
// const { PostScanner } = require('./controllers/ScannerController');
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

dotenv.config({ path: './.env' });
const { httpServer } = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.set('strictQuery', false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = httpServer.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
// cron.schedule('*/5 * * * *', () => {
//   PostScanner();
// });
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  // server.close(() => {
  //   process.exit(1);
  // });
});
