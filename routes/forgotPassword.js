const express = require('express');
const router  = express.Router();
const User    = require('../model/User');
const bcrypt  = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

require('dotenv').config();

router.post('/',(req,res,next) => {
    const email = req.body.email;
    User.findOne({email:email})
    .then(foundUser => {
        if(!foundUser) {
            res.status(403).json({
                success:false,
                message:'email is not in the database'
            })
            return;
        } 
        const token = crypto.randomBytes(20).toString('hex');
        User.updateOne(
            {_id:foundUser._id},
            {$set: { resetPasswordToken: token, 
                resetPasswordExpires:Date.now()+3600000 } 
        }
        )
        .then(response => {
            const transportor = nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:`${process.env.EMAIL_ADDRESS}`,
                    pass:`${process.env.EMAIL_PASSWORD}`
                }
            })
    
            const mailOptions = {
                from: 'aom.ironhack.app@gmail.com',
                to:`${foundUser.email}`,
                subject:'Link To Reset Password of your Mana-Architecture app',
                text:'You are receiving this because you (or someone else) has asked to reset the password for your account.\n\n'
                    +'Please click on the link or paste this to your browser to complete the process in one hour.\n\n'
                    +`https://aom-ironhack-app.netlify.app/reset/${token} \n\n`
                    +'If you did not request this, please ignore this email and your password will remain unchanged'
            }
    
            transportor.sendMail(mailOptions,(err,response)=> {
                if(err) {
                   return next(err);
                }
                res.status(200).json({
                    success:true,
                    message:'recovery email sent.'
                })
            })
        })
    })
})

router.get('/:token',(req,res,next) => {
    const token = req.params.token;
    User.findOne({resetPasswordToken:token,
        resetPasswordExpires:{$gt:Date.now()}
    })
    .then(foundUser => {
        if(!foundUser) {
            return res.status(403).json({
                success:false,
                message:'The password reset link is invalid or has expired. '
            })
        }
        return res.status(200).json({
            success: true,
            user: foundUser
        });
    })
    .catch(err => next(err))
})

router.put('/resetpassword/:userID',(req,res,next) => {
    const userID = req.params.userID;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);
    User.findOneAndUpdate({_id:userID},{password:hash})
    .then(response => {
        res.status(200).json({
            success:true,
            message:'password is successfully changed.'
        })
    })
    .catch(err => next(err))

})

module.exports = router;


