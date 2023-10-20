const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Define a new LocalStrategy for passport
passport.use(new LocalStrategy({
  usernameField: 'email',      // Field name for the username (in the request body)
  passReqToCallback: true      // Allows passing the request object to the callback function
}, async function (req, email, password, done) {
  try {
    // Attempt to find a user with the provided email in the database
    const user = await User.findOne({ email: email });

    // If no user is found or the provided password is incorrect
    if (!user || !await user.isValidPassword(password)) {
      req.flash('error', 'Invalid username/password!');
      // Indicate authentication failure by calling done with false
      return done(null, false);
    }

    // If a user is found and the password is correct, call done with the user object
    return done(null, user);
  } catch (err) {
    console.log('error in finding user', err);
    // Pass the error to done to indicate an error occurred during authentication
    return done(err);
  }
}));


passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async function(id,done){
    try{
        const user = await User.findById(id);
        return done(null,user);
    }catch(err){
        console.log('err',err);
        return done(err);
    }
});

//check the user is authenticated
passport.checkAuthentication = function(req,res,next){
  //ifthe user is signed in pass request to next function (which is controller action)
  if(req.isAuthenticated()){
    return next();
  }
  //ifthe user is not signed in
  return res.redirect('/users/log-in');

}

passport.setAuthenticatedUser = function(req,res,next){

if(req.isAuthenticated()){
  //req.user contains current signed in user from the session cookie and we are just sending this to the locals for the views
   res.locals.user = req.user
}
next();

}
module.exports = passport;
