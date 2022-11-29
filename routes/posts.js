const express =require('express');
const router = express.Router()
console.log('post Router loaded');
const postController=require('../controllers/posts_controller');
router.get('/post1',postController.post1);


module.exports= router;