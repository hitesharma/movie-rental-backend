const {Genre, validate} = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res)=>{
    let genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req,res)=>{
    let genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('Genre not found');
    res.send(genre);
});

router.post('/', async (req,res)=>{

    let {error} = validate(req);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({name: req.body.name});
    try{
        await genre.save();
    }catch(error){
        if(error.code == 11000)
            res.send('Genre already exist');
    }
    res.send(genre);
});

router.put('/:id', async (req,res)=>{
    let {error} = validate(req);
    if(error) return res.status(400).send(error.details[0].message);
    try{
        let genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name},
            {new: true});
    }catch(error){
        if(error.code == 404)
            return res.send('Genre not found');
        if(error.code == 11000)
            return res.send('Genre already present');
    }
    res.send(genre);
});

router.delete('/:id', async (req,res)=>{
    let genre = await Genre.findByIdAndDelete(req.params.id);
    if(!genre) return res.status(404).send('Genre not found');
    res.status(200).send(genre);
});

module.exports = router;