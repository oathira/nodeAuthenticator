const User = require('../models/user');

module.exports.profile = function(req,res){
  return res.render('user_profile', {
      title: "user_profile"
  })
}

module.exports.logIn = function(req,res){
  if (req.isAuthenticated()){
    return res.redirect('/users/profile');
}
    return res.render('user_sign_in', {
        title: "LogIn"
    })
} 



module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
      req.flash('error', 'Passwords are not equal!');
      return res.redirect('back');
    }
  
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        await User.create(req.body);
        return res.redirect('/users/log-in');
      } else {
        req.flash('error',"This email already exist");
        return res.redirect('back');
      }
    } catch (err) {
      console.log('Error in signing up:', err);
      return res.redirect('back');
    }
  };

// sign in and create a session for the user
module.exports.createSession = function(req,res){
  req.flash('success','Logged In successfully!');
  return res.redirect('/users/profile');
    
}

module.exports.destroySession = function(req, res) {
  req.logout(function(err) {
    if (err) {
      console.error('Error while logging out:', err);
    }
    req.flash('success', 'You have logged out!');
    return res.redirect('/users/log-in');
  });
}


