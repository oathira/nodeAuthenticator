module.exports.home= function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('home', {
        title: " Register",
    }
    )
} 

