const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../model/User');
const bcrypt        = require('bcrypt');

passport.use(new LocalStrategy(
    (username,password,cb) => {
        User.findOne({username})
        .then(foundUser => {
            if(!foundUser) {
                cb(null,false,{message:'Incorrect username or password!'});
                return;
            }
            if(!bcrypt.compareSync(password,foundUser.password)) {
                cb(null,false,{message:'Incorrect username or password!'});
                return;
            }
            cb(null,foundUser);
        })
        .catch(err => {
            cb(err)
        })
    }
));