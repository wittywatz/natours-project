/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log(err.message));
