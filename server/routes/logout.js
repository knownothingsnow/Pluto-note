'use strict'
/**
 * @author Knight Young
 */
let express = require('express')
let router  = express.Router()

router.get('/', function (req, res) {
  req.session.destroy()
  res.render('jump', {msg: '你已经安全退出!'})
})

module.exports = router