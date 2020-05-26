const express = require('express');
const router  = express.Router();
const User    = require('../model/User');

const bcrypt  = require('bcrypt');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//POST create a new user and res a json file to front end.... it's a un-protected route.
router.post('/', (req,res,next) => {
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
    res.status(201).json(newUser)
  })
  .catch(err => next(err))
})

//

module.exports = router;
