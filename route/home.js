const express = require('express');
const router  = express.Router();
const { index, dashboard } = require('../controller/homeController');
const loginRequired = require('../config/JWT')
router.route('/').get(index);

router.route('/dashboard').get(dashboard, loginRequired);

module.exports = router;

