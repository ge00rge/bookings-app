const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// this error handler can be before server starts before this errors are not catched async.
// we define it before app js to catch errors inside that module.
// uncaught exceptions: errors occur in synchronous code:
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!! Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

const app = require('./app');

const db = process.env.DATABASE_LOCAL;

const started = new Date();
console.info(`Connecting to Mongoose:     ${started.toLocaleTimeString()}`);

const tm = function (startTime, failVal) {
  const end = new Date() - startTime;
  const fail = end <= failVal ? 'pass' : 'fail';
  return `${new Date().toLocaleTimeString()}: ${end
    .toString()
    .padStart(5, ' ')} ms : ${fail}`;
};

mongoose
  .connect(db, {
    useNewUrlParse: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful!!', tm(started, 20000));
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION!! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// the way that Heroku does this is by sending the so-called "sick term signal"
// to our note application, and the application will then basically shut down immediately.
// SIGTERM is an event that can be emitted and that our application receives and can then respond to.
process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});
