const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 20,
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength:5,
        maxlength:5
    }
});

const Customer = mongoose.model('Customer', customerSchema);

const validateCustomer = (req)=>{
    const schema = Joi.object({
        name: Joi.string().min(5).max(20).required(),
        phone: Joi.string().min(5).max(5).required(),
        isGold: Joi.boolean()
    })
    return schema.validate(req.body);
}

exports.Customer = Customer;
exports.validate = validateCustomer;