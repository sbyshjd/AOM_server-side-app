const express = require('express');
const router  = express.Router();
const User    = require('../model/User');

const bcrypt  = require('bcrypt');
const passport = require('passport');

const uploadCloud = require('../config/cloudinary-setup');

const isLogged = require('../config/isLogged');



/* GET users listing. */
router.get('/', isLogged, function(req, res, next) {
  User.find()
  .then(foundUsers => {
    res.status(200).json(foundUsers)
  })
  .catch(err => next(err))
});

//POST signup to create a new user and res a json file to front end.... it's a non-role route.
router.post('/signup', (req,res,next) => {
  const {username,password,email} = req.body;
  if(username===''||password===''||email==='') {
    return res.status(400).json({success:false,message:'Invalid input please fill in all the information'})
  }
  User.findOne({username})
  .then(foundUser => {
    if(foundUser) {
      return res.status(400).json({success:false,message:'The username is being used, please use another name.'})
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);
    return User.create({username,password:hash,email})
  })
  .then(newUser => {
    req.logIn(newUser,(err)=> {
      if(err) {return next(err);}
      return res.status(201).json({success:true,user:newUser})
    })
    // return res.status(201).json(newUser)
  })
  .catch(err => next(err))
})

//POST login the user in the app.......it's a non-role route.
router.post('/login',(req,res,next)=> {
  passport.authenticate('local',(err,user,info) => {
    if(err) {return next(err)};
    if(!user) {
      return res.status(400).json({success:false,error:req.error})
    }
    req.logIn(user,(err)=> {
      if(err) {return next(err);}
      return res.status(200).json({success:true,user:req.user})
    })
  })(req,res,next);
})

//GET to check if the user is logged in
router.get('/isLogged',(req,res,next)=> {
  if(req.isAuthenticated()) {
    return res.status(200).json(req.user)
  }
  return res.status(403).json({message:'Unauthorized'})
})

//GET to log out the user
router.get('/logout',(req,res,next)=> {
  req.logout();
  res.status(200).json({message:'Log out successfully!'})
})

//PUT update the users profile by id themselves..........it's a non-role route.
router.put('/edit',(req,res,next)=> {
  const { username,firstname,lastname,address,zipcode,city,country,phone,email,birthday,birthplace,nationality } = req.body;
  User.findByIdAndUpdate(req.user.id,{ username,firstname,lastname,address,zipcode,city,country,phone,email,birthday,birthplace,nationality })
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err=>next(err))
})

//POST upload user image to cloudinary
router.put('/upload',uploadCloud.single('photo'),(req,res,next)=> {
  if(!req.file) {
    next(new Error('no file upload!'));
    return;
  }
  User.findOneAndUpdate({_id:req.user.id},{photo:req.file.path})
  .then(response => {
    res.status(200).json({response})
  })
  .catch(err => {
    next(err=>next(err))
  })
})

//log in by google method
router.post('/login/google',
  passport.authenticate('google-token'),
  async (req,res) => {
    if(req.error) {
      return res.status(401).json({
        success: false,
        user:null
      })
    } else {
      return res.status(200).json(req.user);
    }
  }
 );

 //delete the user by admin;
router.delete('/delete/:id',isLogged,(req,res,next) => {
  const id = req.params.id;
  User.findOneAndDelete({_id:id})
  .then(response => {
    res.status(200).json({
      success:true,
      message: response
    })
  })
  .catch(err => next(err))
})

module.exports = router;
