/**
 * Created by Knight_Young on 2016/2/20 0020.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('admin')
});

module.exports = router;