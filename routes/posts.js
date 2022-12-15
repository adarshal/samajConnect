const express =require('express');
const router = express.Router();
const passport = require('passport');

console.log('post Router loaded');
const postController=require('../controllers/posts_controller');

router.post('/create',passport.checkAuthenthication, postController.create);
router.get('/destroy/:id',passport.checkAuthenthication, postController.destroy);




module.exports= router;