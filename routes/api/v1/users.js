const express =require('express');
const router = express.Router();
const user_Api = require('../../../controllers/api/v1/users_api');


router.post('/create-session',user_Api.loginCreateSession);
module.exports=router;