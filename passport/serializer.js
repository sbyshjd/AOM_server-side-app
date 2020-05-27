const passport = require('passport');
const User     = require('../model/User');

passport.serializeUser((logUser,cb)=> {
    cb(null,logUser._id)
});

passport.deserializeUser((id,cb)=> {
    User.findById(id)
    .then(user => {
        cb(null,user)
    })
    .catch(err => {
        cb(err)
    })
})