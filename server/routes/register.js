'use strict'
/**
 * 用户注册接口
 * @author Knight Young
 * @type {*|exports|module.exports}
 */

let express = require('express'),
    login   = require('../modules/loginPage/main'),
    con     = require('../modules/connectDB.js'),
    router  = express.Router()

router.all('/', function(req, res, next) {
  
  con.query(login.inputCheck(req.body)).then(function(results) {
    console.log(results)
    if(results.length !== 0) {//用户名存在

      res.render('jump', {msg: '该用户名已经被注册过,换个名字试试.'})

    } else { next() }
    
  }).catch(function(error) { throw error })

}, function(req, res) {

  con.query(login.register(req.body)).then(function(results) {

    req.session.userName = req.body.newName
    req.session.userId   = results.insertId

    res.render('jump', {msg: '注册成功'})

  }).catch(function(error) { throw error })

})

module.exports = router