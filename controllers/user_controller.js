const User = require('../models/user');



module.exports.logIn = function(req,res){
    return res.render('user_sign_in', {
        title: "LogIn"
    })
} 

module.exports.register = function(req,res){
    return res.render('user_sign_up',{
        title:'Register'
    })
} 

module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
      console.log("passwords are not equal");
      return res.redirect('back');
    }
  
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        await User.create(req.body);
        return res.redirect('/users/log-in');
      } else {
        console.log("this email already exist");
        return res.redirect('back');
      }
    } catch (err) {
      console.log('Error in signing up:', err);
      return res.redirect('back');
    }
  };

// sign in and create a session for the user
module.exports.createSession = function(req,res){
    
}

