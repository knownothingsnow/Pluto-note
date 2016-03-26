'use strict'
/**
 * @type {*|exports|module.exports}
 * @author Knight Young
 */
//   todo 解决回调地狱
//   todo 首屏渲染(默认渲染第一个笔记本的第一篇笔记)
//   todo 笔记的增删改,每次操作刷新列表,点击打开对应笔记
//   todo 将当前笔记本的id存在session里,笔记本按钮的状态机,点击打开笔记本,重命名对应笔记本,删除笔记本
let express  = require('express')
let router   = express.Router()
let noteBook = require('../modules/indexPage/noteBook')
let note     = require('../modules/indexPage/note')

router.all('/', function (req, res) {
  if (req.session.userId) {//如果用户已经登陆,收集首屏渲染所需的所有数据,然后渲染view
    noteBook.selectNoteBooksId(req.session.userId, function (results) {

      //在session里存储当前的笔记本ID
      req.session.notebookId = results[0].notebookId

      //收集首屏渲染所需要的数据
      let first_render = {
        username: req.session.userName
      }

      noteBook.selectAllNoteBook(req.session.userId, function (results) {

        //收集该用户所有笔记本名
        first_render.notebooks = results

        note.selectAllNoteHeader(req.session.notebookId, function (results) {

          //收集该笔记本ID下所有笔记名
          first_render.notes = results
          res.render('indexPage/index', first_render)

        })
      })
    })
  } else {
    res.render('jump', {msg: '你还没有登录!'})
  }
})
/**********操作笔记接口**********/

//获取一篇笔记的内容
router.post('/selectNote', function (req, res) {
  note.selectOneNote(req.body.noteId, function (results) {
    res.send(results)
  })
})

//保存一篇笔记
router.post('/saveNote', function (req, res) {
  note.updateNoteContent(req.body.noteId, req.body.content, function (results) {
    res.send(results)
  })
})

//重命名一篇笔记
router.post('/renameNote', function (req, res) {
  note.updateNoteHeader(req.body.noteId, req.body.newHeader, function (results) {
    if (results) {
      note.selectAllNoteHeader(req.session.notebookId, function (notes) {

        //收集该笔记本ID下所有笔记名
        res.send(notes)

      })
    }
  })
})

//删除一篇笔记
router.post('/deleteNote', function (req, res) {

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
