const express = require('express');
const router  = express.Router();
const Event   = require('../model/Event');

//POST create a new event 
router.post('/',(req,res,next)=> {
    const {eventname,description,starttime,endtime,owner} = req.body;
    Event.create({eventname,description,starttime,endtime,owner})
    .then(newEvent => {
        res.status(201).json(newEvent)
    })
    .catch(err => next(err))
})

//GET get all the events from the data base
router.get('/',(req,res,next)=> {
    Event.find()
    .populate('owner')
    .then(events => {
        res.status(200).json(events)
    })
    .catch(err => next(err))
})


module.exports = router;