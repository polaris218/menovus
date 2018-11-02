const express = require('express');
const router = express.Router();
const userControllers=require('../controllers/userController');

router.get('/:id', userControllers.userId);

router.post('/', userControllers.createMemeber);

router.put('/:id', userControllers.update);

router.delete('/:id', userControllers.dataDelete);

module.exports = router;