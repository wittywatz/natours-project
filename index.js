/* eslint-disable no-console */
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! \n Shutting server down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');
require('./DB');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! \n Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. \n Shutting down gracef ully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
