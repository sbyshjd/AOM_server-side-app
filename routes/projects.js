const express = require('express');
const router  = express.Router();
const Project = require('../model/Project');
const User = require('../model/User');
const isLogged= require('../config/isLogged');

//POST create a project
router.post('/',isLogged,(req,res,next)=> {
    const {projectname,projectcode,startdate,enddate,status,partner,leader,team,phase} = req.body;
    //Update the user to change his role to project leader;
    
    //Assign all the team with the project;
    
    Project.create({projectname,projectcode,startdate,enddate,status,partner,leader,team,phase})
    .then(newProject => {
        const updateProject = User.updateMany({ _id: { $in: team } },{ $push:{projects:newProject._id} });
        const updateOther = User.updateMany({ _id: { $nin: team } },{ $pull:{projects:newProject._id} });
        Promise.all([updateProject,updateOther])
        .then(response => {
            res.status(200).json(newProject)
        })  
    })
    .catch(err => next(err))
})
//GET get all the projects
router.get('/',isLogged,(req,res,next) => {
    Project.find()
    .populate('partner')
    .populate('leader')
    .populate('team')
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => next(err))
})

//GET get one project by ID
router.get('/:id',isLogged,(req,res,next)=> {
    const id = req.params.id;
    Project.findById(id)
    .populate('partner')
    .populate('leader')
    .populate('team')
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => next(err))
})

//DELETE delete the selected project by id
router.delete('/:id',isLogged,(req,res,next) => {
    const id = req.params.id;
    User.updateMany({projects:id},{$pull:{projects:id}})
    .then(response => {
        return Project.findByIdAndDelete(id)
    })
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => next(err))
})

//PUT edit the selected project by id
router.put('/:id',isLogged,(req,res,next)=> {
    const id = req.params.id;
    const {projectname,projectcode,startdate,enddate,status,partner,leader,team,phase}=req.body;
    Project.findByIdAndUpdate(id,{projectname,projectcode,startdate,enddate,status,partner,leader,team,phase})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => next(err))
})

module.exports = router;