const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// Tell passport to use a new strategy for Google login
passport.use(new googleStrategy({
    clientID :'562546852774-ri1v7rf5t9tprvnl6nl41gbi0ac862sq.apps.googleusercontent.com',
    clientSecret :'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',
    callbackURL : 'http://localhost:3000/users/auth/google/callback'
},
 async function(accessToken,refreshToekn,profile,done){
    try{
        // Find a user
        const user = await User.findOne({email:profile.emails[0].value}).exec();
        if(user){
            // If found, set this user as req.user
            return done(null,user)
        }else{
            // If not found, create the user and set it as req.user
            const newUser = await User.create({
                name : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex')
            });
            return done(null,newUser)
        }
    }catch(err){
        console.error("Error in Google strategy passport:", err);
        return done(err);// Pass the error to the done callback
    }
   
 }
));

module.exports = passport;