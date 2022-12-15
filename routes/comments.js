const express =require('express');
const router = express.Router();
const passport = require('passport');

// console.log('comment Router loaded');
const commentController=require('../controllers/comment_controller');

router.post('/create',passport.checkAuthenthication, commentController.create);
router.get('/destroy/:id',passport.checkAuthenthication, commentController.destroy);




module.exports= router;