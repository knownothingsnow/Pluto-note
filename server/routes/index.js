'use strict'
/**
 * @type {*|exports|module.exports}
 * @author Knight Young
 */

let express  = require('express')
let router   = express.Router()
let noteBook = require('../modules/indexPage/noteBook')

/* GET users listing. */
router.get('/', function (req, res) {
  console.log(Object.prototype.toString.call(req.session.userName))
  res.render('indexPage/index')
})

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
              data:results
            })
          })
        }
      })
    }
  })
})

module.exports = router
