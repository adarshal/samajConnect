const express =require('express');
const router = express.Router();
const posts_Api = require('../../../controllers/api/v2/post_api');

router.get('/',posts_Api.index);
module.exports=router;