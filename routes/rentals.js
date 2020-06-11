const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res)=>{
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.get('/:id', async (req, res)=>{
    const rental = await Rental.findById(req.params.id);
    if(!rental) return res.status(404).send('Rental record not found');
    res.send(rental);
});

router.post('/', async (req, res)=>{
    const {error} = validate(req);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send('Invalid Customer');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(404).send('Invalid Movie');

    if(!movie.inStock === 0) return res.status(400).send('Movie out of stock');
    
    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRent: movie.dailyRent
        }
    });
    await rental.save();

    movie.inStock--;
    movie.save();
    
    res.send(rental);
});

module.exports = router;