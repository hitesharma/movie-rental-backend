const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/movie-rental',{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false})
        .then(()=> console.log('Connected to MongoDB....'))
        .catch(error => console.error('Connection Failed....'));
}