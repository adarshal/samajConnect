const express =require('express');
const passport = require('passport');
const router = express.Router()
console.log('user Router loaded');
const userController=require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthenthication, userController.profile); // added middleware to check if user signed in to show profile
router.post('/update/:id',passport.checkAuthenthication, userController.update); // added middleware to check if user signed in to show profile


router.get('/signup',userController.signup);

router.post('/create-account',userController.createAccount);
router.get('/signin',userController.signin);

// use passport as middlerware to authenthivate
router.post('/signin-account',
passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
),
userController.loginCreateSession);

router.get('/signout',userController.signout);

router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',
    {failureRedirect: '/users/signin'}, // this'google' comes from main index.js passportGoogle
),
userController.loginCreateSession);

    


module.exports= router;
