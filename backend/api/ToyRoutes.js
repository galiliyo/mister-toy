'use strict';
const express = require('express')
const router = express.Router()
const toyService = require('../services/ToyService')
module.exports = router

router.get('/', (req, res) => {
    const filterBy = req.query
    toyService.query(filterBy)
        .then(toys => {
            res.json(toys)
        })
        .catch(err => res.status(418).send(err))
})

router.get('/:id',(req,res)=>{
    const _id = req.params.id;
    toyService.getById(_id)
    .then(toy => res.json(toy))
    .catch(err => res.status('404').send('Toy not found'))
})

router.delete('/:_id',(req,res)=>{
    let {_id} = req.params;
    toyService.remove(_id)
    .then(() => res.json({}))
    .catch((err)=>req.status('403').send(err))
})

router.post('/',(req,res)=>{
    let toy = req.body;
    toyService.add(toy)
    .then(toy => res.json(toy))
    .catch(err => res.status('403').send(err))
})

router.put('/:_id',(req,res)=>{
    let toy = req.body;
    toyService.update(toy._id,toy)
    .then(toy => res.json(toy))
    .catch(err => res.status('403').send(err))
})