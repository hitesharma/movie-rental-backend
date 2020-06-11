const express = require('express');
const app = express();
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const config = require('config');
const morgan = require('morgan');
const debug = require('debug')('startup');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/movie-rental',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(()=> console.log('Connected to MongoDB....'))
    .catch(error => console.error('Connection Failed....'));
    
app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

if(app.get('env')==='development'){
    app.use(morgan('dev'));
    debug('Morgan enabled');
}

app.get('/', (req,res)=>{
    res.send('Root');
})

const port = 8000 || process.env.PORT;
app.listen(port),()=>console.log(`Listening to port ${port}`);