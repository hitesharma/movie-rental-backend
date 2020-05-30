const mongoose = require('mongoose');
const genres = require('./routes/genres');d
const config = require('config');
const morgan = require('morgan');
const debug = require('debug')('startup');
const express = require('express');
const app = express();

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/movie-rental',{ useNewUrlParser: true })
    .then(()=> console.log('Connected to MongoDB....'))
    .catch(error => console.error('Connection Failed....'));
    
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api/genres',genres);

console.log(`Application name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);

if(app.get('env')==='development'){
    app.use(morgan('dev'));
    debug('Morgan enabled');
}

app.get('/', (req,res)=>{
    res.send('Root');
})

const port = 8000 || process.env.PORT;
app.listen(port),()=>console.log(`Listening to port ${port}`);