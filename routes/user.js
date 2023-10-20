const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');

router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/log-in',userController.logIn);


router.post('/create',userController.create);

//use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/log-in'}
    ),userController.createSession);

router.get('/reset',passport.checkAuthentication,userController.reset);
// router.post('/reset',userController.resetPassword);

router.get('/log-out',userController.destroySession);

router.get('/auth/google',passport.authenticate(
'google',
{ scope:['profile','email']}
    ));

router.get('/auth/google/callback',passport.authenticate(
'google',
{failureRedirect:'users/log-in'}
),userController.createSession);



module.exports = router;
