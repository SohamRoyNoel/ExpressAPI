const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');


// Route Files
const bootcamps = require('./routes/bootcamps');

// Middleware
const logger = require('./middleware/logger');


dotenv.config({ path: './config/config.env' });

const app = express();

// Mount Middleware 
//app.use(logger);

// Dev logging Middleware
if(process.env.NODE_ENV === 'developmemt'){
      app.use(morgan()); // ::1 - - [Sat, 26 Sep 2020 06:53:29 GMT] "PUT /api/v1/bootcamps/1656 HTTP/1.1" 200 55 "-" "PostmanRuntime/7.26.4"
}


// Mount Routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
      console.log('App listening on port ${PORT} ${process.env.NODE_ENV}');
});