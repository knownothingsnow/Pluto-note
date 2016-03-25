'use strict'
/**
 * @type {*|exports|module.exports}
 * @author Knight Young
 */

let express  = require('express')
let router   = express.Router()
let noteBook = require('../modules/indexPage/noteBook')

router.get('/', function (req, res) {
  // same as login.js
  if (req.session.userId) {
    res.render('indexPage/index')
  } else {
    res.render('jump',{msg:'你还没有登录!'})
  }
})

/**
 * 添加笔记本接口
 */
router.post('/addNoteBook', function (req, res) {
  // 如果传入的笔记本名已经存在就返回{done: false}
  noteBook.selectOneNoteBook(req.session.userId, req.body.notebookName, function (result) {
    // console.log(result)
    if (result) {
      res.send({repeat: true})
    } else {
      noteBook.addNoteBook(req.session.userId, req.body.notebookName, function (results) {
        if (results) {
          noteBook.selectAllNoteBook(req.session.userId, function (results) {
            res.send({
              repeat: false,
              data  : results
            })
          })
        }
      })
    }
  })
})

module.exports = router
