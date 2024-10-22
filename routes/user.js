const express = require('express');
const router = express.Router();
const { login, Updateuser} = require('../controllers/usercontroller');
const verifyToken  = require('../middlewares/verifyToken');

router.post('/login', login());
router.post('/update/:id', verifyToken ,Updateuser());

module.exports = router;