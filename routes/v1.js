const express = require('express');
const router = express.Router();

router.use('/authentication', require('./authentication'));
router.use('/user', require('./user'));
router.use('/notes', require('./notes'));

module.exports = router;