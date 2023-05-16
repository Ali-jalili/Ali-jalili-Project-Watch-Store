const express = require('express');
const { getAllproducts } = require('../controllers/Products')

const router = express.Router();

router.get('/', getAllproducts)

module.exports = router;
