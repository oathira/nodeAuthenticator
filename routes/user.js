const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');


router.get('/log-in',userController.logIn);
router.get('/register',userController.register);

router.post('/create',userController.create);
router.post('/create-session',userController.createSession);

module.exports = router;
