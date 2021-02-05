const express = require('express');
const router = express.Router();

router.use('/authentication', require('./authentication'));
router.use('/user', require('./user'));

module.exports = router;