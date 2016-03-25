'use strict'
/**
 * @type {*|exports|module.exports}
 * @author Knight Young
 */
//todo 解决回调地狱
//   todo 首屏渲染(默认渲染第一个笔记本的第一篇笔记)
//   todo 笔记的增删改,每次操作刷新列表,点击打开对应笔记
//   todo 将当前笔记本的id存在session里,笔记本按钮的状态机,点击打开笔记本,重命名对应笔记本,删除笔记本
let express  = require('express')
let router   = express.Router()
let noteBook = require('../modules/indexPage/noteBook')
let note     = require('../modules/indexPage/note')

router.get('/', function (req, res) {
  // same as login.js
  if (req.session.userId) {
    //收集首屏渲染所需要的数据
    let first_render = {
      username: req.session.userId
    }

    noteBook.selectAllNoteBook(req.session.userId, function (results) {
      first_render.notebooks = results

      note.selectAllNoteBook(req.session.notebookId, function (results) {
        console.log(results)
        first_render.notes = results
      })
    })
    res.render('indexPage/index', first_render)

  } else {
    res.render('jump', {msg: '你还没有登录!'})
  }
})

/**********操作笔记本的接口**********/
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

/**********操作笔记的接口**********/

module.exports = router
