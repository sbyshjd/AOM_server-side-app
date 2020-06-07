const express = require('express');
const router  = express.Router();
const Event   = require('../model/Event');
const isLogged= require('../config/isLogged');

//POST create a new event 
router.post('/',isLogged,(req,res,next)=> {
    const {type,eventname,description,starttime,endtime,owner,mode,forwho,participants} = req.body;
    Event.create({type,eventname,description,starttime,endtime,owner,mode,forwho,participants})
    .then(newEvent => {
        res.status(201).json(newEvent)
    })
    .catch(err => next(err))
})

//GET get all the events from the data base
router.get('/', isLogged, (req,res,next)=> {
    Event.find()
    .populate('owner')
    .populate('forwho')
    .populate('participants')
    .then(events => {
        res.status(200).json(events)
    })
    .catch(err => next(err))
})

//DELETE delete the selected event card
router.delete('/:id', isLogged, (req,res,next) => {
    const id = req.params.id
    Event.findByIdAndDelete(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => next(err))
})

//PUT edit the event card 
router.put('/edit/:id',isLogged,(req,res,next)=> {
    const id = req.params.id;
    const { type,eventname,description,starttime,endtime,mode } = req.body;
    Event.findOneAndUpdate({_id:id},{type,eventname,description,starttime,endtime,mode})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => next(err))
})

//PUT add the invited people to forwho property
router.put('/invite/:id',isLogged,(req,res,next)=> {
    const id = req.params.id;
    const {forwhoID} = req.body;
    console.log(forwhoID)
    Event.findOneAndUpdate({_id:id},{ $set: { "forwho": forwhoID } })
    .then(response=> {
        res.status(200).json(response)
    })
    .catch(err => next(err))
})

//PUT add the participant from the client side
router.put('/join/:id',isLogged,(req,res,next)=> {
    const id = req.params.id;
    const {participantID} = req.body;
    Event.findOneAndUpdate({_id:id},{ $push: { participants: participantID } })
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => next(err))
})

//PUT unjoin the participant from the clint side
router.put('/unjoin/:id',isLogged,(req,res,next)=> {
    const id = req.params.id;
    const {participantID} = req.body;
    Event.findOneAndUpdate({_id:id},{ $pull: { participants: participantID } })
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => next(err))
})


module.exports = router;