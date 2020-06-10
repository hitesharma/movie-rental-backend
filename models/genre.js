const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10,
    }
});

let Genre = mongoose.model('Genre', genreSchema);

const validateGenre = (req)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(10).required()
    })
    return schema.validate(req.body);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre;