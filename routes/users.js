const express = require('express');
const router  = express.Router();
const User    = require('../model/User');

const bcrypt  = require('bcrypt');
const passport = require('passport');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//POST signup to create a new user and res a json file to front end.... it's a non-role route.
router.post('/signup', (req,res,next) => {
  const {username,password,birthday,email} = req.body;
  User.findOne({username})
  .then(foundUser => {
    if(foundUser) {
      return res.status(400).json({message:'The username is being used, please use another name.'})
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);
    return User.create({username,password:hash,birthday,email})
  })
  .then(newUser => {
    // req.logIn(newUser,(err)=> {
    //   if(err) {return next(err);}
    //   return res.status(201).json(newUser)
    // })
    return res.status(201).json(newUser)
  })
  .catch(err => next(err))
})

//POST login the user in the app.......it's a non-role route.
router.post('/login',(req,res,next)=> {
  passport.authenticate('local',(err,user,info) => {
    if(err) {return next(err)};
    if(!user) {
      return res.status(400).json(info)
    }
    req.logIn(user,(err)=> {
      if(err) {return next(err);}
      return res.status(200).json(user)
    })
  })(req,res,next);
})


//PUT update the users profile by id themselves..........it's a non-role route.


module.exports = router;
