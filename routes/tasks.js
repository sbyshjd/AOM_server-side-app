const express = require('express');
const router  = express.Router();
const Project = require('../model/Project');
const User = require('../model/User');
const Task = require('../model/Task');
const isLogged= require('../config/isLogged');

//POST create a task
router.post('/',isLogged,(req,res,next)=> {
    const {taskname,startdate,enddate,user,project} = req.body;
    
    Task.create({taskname,startdate,enddate,user,project})
    .then(newTask => {
        res.status(200).json(newTask)  
    })
    .catch(err => next(err))
})

//GET get all the tasks according to project ID
router.get('/:projectID',isLogged,(req,res,next) => {
    const projectID = req.params.projectID
    Task.find({project:projectID})
    .populate('project')
    .populate('user')
    .then(tasks => {
        res.status(200).json(tasks)
    })
    .catch(err => next(err))
})

//GET get all the tasks from the database
router.get('/',isLogged,(req,res,next)=> {
    Task.find()
    .populate('project')
    .populate('user')
    .then(tasks => {
        res.status(200).json(tasks)
    })
    .catch(err => next(err))
})


//DELETE delete the selected task by task id 
router.delete('/:id',isLogged,(req,res,next) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => next(err))
})

module.exports = router;