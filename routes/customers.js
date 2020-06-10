const {Customer, validate} = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=>{
    let customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req,res)=>{
    let customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send('Customer not found');
    res.send(customer);
});

router.post('/', async (req,res)=>{
    let {error} = validate(req);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    
    await customer.save();
    res.send(customer);
});

router.put('/:id', async (req,res)=>{
    let {error} = validate(req);
    if(error) return res.status(400).send(error.details[0].message);

    customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }, {new: true} );
        
    if(!customer) return res.status(404).send('Customer not found');
    res.send(customer);
});

router.delete('/:id', async (req, res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(400).send('Customer not found');
    res.send(customer);
})

module.exports = router;