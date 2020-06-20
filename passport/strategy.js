const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
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

passport.use(
    new GoogleTokenStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
        async (accessToken, refreshToken, profile, done) => {
            const { imageUrl, id, ...rest }= profile;
            let user = null;
            let error = null;
            try {
                let existingUser = await User.findOne({providerId:id})
                if(existingUser) {
                    user = existingUser;
                } else {
                    const verifiedEmail = profile.emails.find(email => email.verified) || profile.emails[0];
                    const newUser = await User.create({
                            email:verifiedEmail.value,
                            username:profile.name.givenName,
                            providerId: id,
                            photo:imageUrl,
                            provider: 'Google'
                        })
                    user = newUser;
                }
            } catch (err){
                error = err;
            }
            return done(error,user)

        }
    )
)