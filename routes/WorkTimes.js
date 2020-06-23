const express = require('express');
const router  = express.Router();
const WorkTime   = require('../model/WorkTime');
const isLogged= require('../config/isLogged');

//POST create a new weekly work-time 
router.post('/',isLogged,(req,res,next)=> {
    const {weekofyear,year,creator,project,monday,tuesday,wednesday,thursday,friday,saturday,sunday} = req.body;
    WorkTime.create({weekofyear,year,creator,project,monday,tuesday,wednesday,thursday,friday,saturday,sunday})
    .then(newWorkTime => {
        res.status(201).json(newWorkTime)
    })
    .catch(err => next(err))
})

//GET get the week time register by userid, year and yearweek
router.get('/:userid/:year/:week',isLogged,(req,res,next)=> {
    const creator = req.params.userid;
    const year = Number(req.params.year);
    const weekofyear = Number(req.params.week);
    WorkTime.find({creator:creator,year:year,weekofyear:weekofyear})
    .populate('project')
    .populate('creator')
    .then(foundWeekTimes => {
        res.status(200).json(foundWeekTimes)
    })
    .catch(err => next(err))
})

// GET get all your week time
router.get('/:userid', isLogged, (req,res,next)=> {
    const creator = req.params.userid;
    WorkTime.find({creator:creator})
    .populate('project')
    .populate('creator')
    .then(workTimes => {
        res.status(200).json(workTimes)
    })
    .catch(err => next(err))
})

//DELETE delete the selected event card
router.delete('/:id', isLogged, (req,res,next) => {
    const id = req.params.id
    WorkTime.findByIdAndDelete(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => next(err))
})

//PUT edit the event card 
router.put('/edit/:id',isLogged,(req,res,next)=> {
    const id = req.params.id;
    const { monday,tuesday,wednesday,thursday,friday,saturday,sunday } = req.body;
    WorkTime.findOneAndUpdate({_id:id},{monday,tuesday,wednesday,thursday,friday,saturday,sunday})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => next(err))
})

//PUT add the invited people to forwho property
// router.put('/invite/:id',isLogged,(req,res,next)=> {
//     const id = req.params.id;
//     const {forwhoID} = req.body;
//     console.log(forwhoID)
//     Event.findOneAndUpdate({_id:id},{ $set: { "forwho": forwhoID } })
//     .then(response=> {
//         res.status(200).json(response)
//     })
//     .catch(err => next(err))
// })

//PUT add the participant from the client side
// router.put('/join/:id',isLogged,(req,res,next)=> {
//     const id = req.params.id;
//     const {participantID} = req.body;
//     Event.findOneAndUpdate({_id:id},{ $push: { participants: participantID } })
//     .then(response => {
//         res.status(200).json(response)
//     })
//     .catch(err => next(err))
// })

//PUT unjoin the participant from the clint side
// router.put('/unjoin/:id',isLogged,(req,res,next)=> {
//     const id = req.params.id;
//     const {participantID} = req.body;
//     Event.findOneAndUpdate({_id:id},{ $pull: { participants: participantID } })
//     .then(response => {
//         res.status(200).json(response)
//     })
//     .catch(err => next(err))
// })


module.exports = router;