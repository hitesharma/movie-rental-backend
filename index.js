require('express-async-errors');
const morgan = require('morgan');
const debug = require('debug')('startup');
const express = require('express');
const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

if(app.get('env')==='development'){
    app.use(morgan('dev'));
    debug('Morgan enabled');
}

const port = 8000 || process.env.PORT;
app.listen(port),()=>console.log(`Listening to port ${port}`);