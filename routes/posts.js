const express =require('express');
const router = express.Router();
const passport = require('passport');

console.log('post Router loaded');
const postController=require('../controllers/posts_controller');
router.get('/post1',postController.post1);
router.post('/create',passport.checkAuthenthication, postController.create);




module.exports= router;