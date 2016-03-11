'use strict';
/**
 * @type {*|exports|module.exports}
 * @author Knight Young
 */
let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('index')
});

module.exports = router;
