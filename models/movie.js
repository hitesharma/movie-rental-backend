const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const {genreSchema} = require('./genre'); 

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    genre: {
        type: genreSchema,
        required: true
    },
    inStock: {
        type: Number,
        default: 0,
        max: 255
    },
    dailyRent: {
        type: Number,
        default: 0,
        max: 255
    }
});

const Movie = mongoose.model('Movie', movieSchema);

const validateMovie = (req)=>{
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required(),
        genre: Joi.object().required(),
        inStock: Joi.number().min(0).max(255).default(0),
        dailyRent: Joi.number().min(0).max(255).default(0)
    });
    return schema.validate(req.body);
}

exports.Movie = Movie;
exports.validate = validateMovie;