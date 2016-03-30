'use strict'
/**
 * @type {*|exports|module.exports}
 * @author Knight Young
 */
//   todo 解决回调地狱
//   todo 笔记的增删改,每次操作刷新列表,点击打开对应笔记
//   todo 将当前笔记本的id存在session里,笔记本按钮的状态机,点击打开笔记本,重命名对应笔记本,删除笔记本
let express  = require('express')
let router   = express.Router()
let noteBook = require('../modules/indexPage/noteBook')
let note     = require('../modules/indexPage/note')

//路由入口
router.all('/', function (req, res) {
  if (req.session.userId) {//如果用户已经登陆,收集首屏渲染所需的所有数据,然后渲染view

    //收集首屏渲染所需要的数据
    let first_render = {
      username: req.session.userName
    }

    noteBook.selectNoteBooksId(req.session.userId, function (results) {
      if (results) {
        //装填该用户所有笔记本ID
        first_render.notebooks = results

        //在session里存储当前的笔记本ID
        req.session.notebookId = results[0].notebookId

        noteBook.selectAllNoteBooksName(req.session.userId, function (results) {

          //装填该用户所有笔记本名
          for (let i = 0; i < first_render.notebooks.length; i ++) {
            first_render.notebooks[i].notebookName = results[i].notebookName
          }

          note.selectAllNoteHeader(req.session.notebookId, function (results) {

            //在session里存储当前的笔记ID
            req.session.noteId = results[0].noteId

            //装填该笔记本ID下所有笔记名
            first_render.notes = results

            note.selectOneNote(req.session.noteId, function (results) {

              //装填首屏渲染所需数据的最后一步
              first_render.first_note_content = results[0].content

              res.render('indexPage/index', first_render)

            })
          })
        })
      } else {
        //新注册的用户没有首屏渲染的内容
        res.render('indexPage/index', first_render)
      }
    })
  } else {
    res.render('jump', {msg: '你还没有登录!'})
  }
})
/**********操作笔记接口**********/

//新建笔记
router.post('/addNote', function (req, res) {

  note.addNote(req.body.header, req.session.notebookId, function (results) {

    if (results.affectedRows === 1) {

      //更新当前的noteId
      req.session.noteId = results.insertId

      res.send({noteId: results.insertId})

    }

  })

})

//获取一篇笔记的内容
router.post('/selectNote', function (req, res) {

  //在session里存储当前的笔记ID
  req.session.noteId = req.body.noteId

  note.selectOneNote(req.body.noteId, function (results) {

    res.send(results)

  })

})

//保存一篇笔记
router.post('/saveNote', function (req, res) {

  note.updateNoteContent(req.session.noteId, req.body.content, function (results) {

    res.send(results)

  })

})

//重命名一篇笔记
router.post('/renameNote', function (req, res) {

  note.updateNoteHeader(req.session.noteId, req.body.newHeader, function (results) {

    if (results.affectedRows === 1) {

      note.selectAllNoteHeader(req.session.notebookId, function (notes) {

        //收集该笔记本ID下所有笔记名
        res.send({list: notes})

      })
    }

  })

})

//删除一篇笔记
router.post('/deleteNote', function (req, res) {

  note.deleteNote(req.session.noteId, function (results) {

    let data = {}

    if (results.affectedRows === 1) {

      //清除当前的noteId
      note.selectAllNoteHeader(req.session.notebookId, function (results) {

        //在删除后将session内的noteId切换到第一篇笔记
        req.session.noteId = results[0].noteId

        data.list = results

        note.selectOneNote(req.session.noteId, function (results) {

          data.newContent = results[0].content

          //将所删除笔记本的ID和数据库中第一篇笔记的内容传到前端
          res.send(data)

        })
      })

    }

  })

})
/**********操作笔记本的接口**********/
/**
 * 添加笔记本接口
 */
router.post('/addNoteBook', function (req, res) {
  // 如果传入的笔记本名已经存在就返回{done: false}
  noteBook.selectOneNoteBook(req.session.userId, req.body.notebookName, function (result) {
    if (result) {
      res.send({repeat: true})
    } else {
      noteBook.addNoteBook(req.session.userId, req.body.notebookName, function (results) {

        if (results) {
          noteBook.selectAllNoteBooksName(req.session.userId, function (results) {

            res.send({repeat: false, data: results})

          })
        }

      })
    }
  })
})

router.post('/deleteNoteBook', function (req, res) {
  noteBook.deleteNoteBook(req.body.notebookId, function (results) {
    if (results) {
      res.send({msg: '删除成功'})
    }
  })
})

router.post('/renameNoteBook', function (req, res) {
  noteBook.updateNoteBook(req.notebookId, req.newNotebookName, function (results) {
    if (results) {
      res.send({msg: '修改成功'})
    }
  })
})


module.exports = router
