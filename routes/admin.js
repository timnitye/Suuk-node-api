const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/test', adminController.test);
router.post('/add-product', adminController.postAddProduct);
module.exports = router;