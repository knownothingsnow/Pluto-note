'use strict'
/**
 * @type {*|exports|module.exports}
 * @author Knight Young
 */
let express  = require('express')
let Notebook = require('../modules/indexPage/noteBook')
let Note     = require('../modules/indexPage/note')
let Record   = require('../modules/indexPage/record')
let con      = require('../modules/connectDB.js')

let router = express.Router()

//路由入口,首屏渲染
router.all('/', function(req, res, next) {
  if(req.session.userId) {//如果用户已经登陆,收集首屏渲染所需的所有数据,然后渲染view
    // 装填首屏渲染所需要的数据
    req.session.first_render = {
      username: req.session.userName
    }

    con.query(Notebook.selectAllNotebooks(req.session.userId)).then(function(results) {

      if(results.length === 0) {//此用户没有笔记本

        //新建笔记本
        con.query(Notebook.addNotebook(req.session.userId, '新建笔记本')).then(function(results) {

          //装填notebooks
          req.session.first_render.notebooks = [{
            notebookId  : results.insertId,
            notebookName: '新建笔记本'
          }]

          //更新session.notebookId
          req.session.notebookId = results.insertId

          next()
        })
      } else {
        //该用户有笔记本，直接装填notebooks
        req.session.first_render.notebooks = results

        //更新session.notebookId
        req.session.notebookId = results[0].notebookId

        next()
      }
    }).catch(function(error) {
      throw error
    })

  } else {
    res.render('jump', {msg: '你还没有登录!'})
  }

}, function(req, res, next) {

  con.query(Note.selectAllNotes(req.session.notebookId)).then(function(results) {

    if(results.length === 0) {//此笔记本没有文稿
      //新建文稿
      con.query(Note.addNote(req.session.notebookId, '新建文稿')).then(function(results) {

        //装填notes
        req.session.first_render.notes = [{
          noteId: results.insertId,
          header: '新建文稿'
        }]

        //更新session.noteId
        req.session.noteId = results.insertId

        next()

      })
    } else {
      //该笔记本有文稿，直接装填notes
      req.session.first_render.notes = results

      //更新session.noteId
      req.session.noteId = results[0].noteId

      next()
    }

  }).catch(function(error) {
    throw error
  })

}, function(req, res) {

  con.query(Record.selectAllRecords(req.session.noteId)).then(function(results) {

    if(results.length === 0) {//此用户没有文稿记录
      let now = Date.now()

      //新建文稿记录
      con.query(Record.addRecord(req.session.noteId, '<p><br></p>', now, 0)).then(function(results) {

        //更新session.recordId
        req.session.recordId = results.insertId

        //装填records
        req.session.first_render.records = [{
          recordId: results.insertId,
          content : '',
          saveTime: now,
          type    : 0
        }]

        console.log(req.session.first_render)
        res.render('indexPage/index', req.session.first_render)
      })
    } else {
      //更新session.recordId
      req.session.recordId = results[0].recordId

      //该用户有文稿记录，直接装填record
      req.session.first_render.records = results

      console.log(req.session.first_render)
      res.render('indexPage/index', req.session.first_render)
    }

  }).catch(function(error) {
    throw error
  })

})


/**********操作文稿接口**********/

//新建文稿
router.post('/addNote', function(req, res) {
  
  Note.addNote(req.body.header, req.session.notebookId, function(results) {
    
    if(results.affectedRows === 1) {
      
      //更新当前的noteId
      req.session.noteId = results.insertId
      
      res.send({noteId: results.insertId})
      
    }
    
  })
  
})

//获取一篇文稿的内容
router.post('/selectNote', function(req, res) {
  
  //在session里存储当前的文稿ID
  req.session.noteId = req.body.noteId
  
  Note.selectOneNoteContent(req.body.noteId, function(results) {
    
    res.send(results)
    
  })
  
})

//自动保存一篇文稿
router.post('/autoSaveNote', function(req, res) {
  
  Note.updateNoteContent(req.session.noteId, req.body.content, function(results) {
    
    res.send(results)
    
  })
  
})

//保存一篇文稿
router.post('/saveNote', function(req, res) {
  
  Note.selectOneNoteHeader(req.session.noteId, function(results) {
    
    if(results) {
      
      Note.addNote(results[0].header, req.session.notebookId, req.body.saveTime, function(results) {
        
        res.send(results)
        
      })
    }
    
  })
  
})

//重命名一篇文稿
router.post('/renameNote', function(req, res) {
  
  Note.updateNoteHeader(req.session.noteId, req.body.newHeader, function(results) {
    
    if(results.affectedRows === 1) {
      
      Note.selectAllNoteHeader(req.session.notebookId, function(notes) {
        
        //收集该笔记本ID下所有文稿名
        res.send({list: notes})
        
      })
    }
    
  })
  
})

//删除一篇文稿
router.post('/deleteNote', function(req, res) {
  
  Note.deleteNote(req.session.noteId, function(results) {
    
    let data = {}
    
    if(results.affectedRows === 1) {
      
      //清除当前的noteId
      Note.selectAllNoteHeader(req.session.notebookId, function(results) {
        
        //在删除后将session内的noteId切换到第一篇文稿
        req.session.noteId = results[0].noteId
        
        data.list = results
        
        Note.selectOneNoteContent(req.session.noteId, function(results) {
          
          data.newContent = results[0].content
          
          //将所删除笔记本的ID和数据库中第一篇文稿的内容传到前端
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
router.post('/addNoteBook', function(req, res) {
  // 如果传入的笔记本名已经存在就返回{done: false}
  Notebook.checkNotebookName(req.session.userId, req.body.notebookName, function(result) {
    if(result) {
      res.send({repeat: true})
    } else {
      Notebook.addNoteBook(req.session.userId, req.body.notebookName, function(results) {
        
        if(results) {
          Notebook.selectAllNoteBooksName(req.session.userId, function(results) {
            
            res.send({repeat: false, data: results})
            
          })
        }
        
      })
    }
  })
})

router.post('/deleteNoteBook', function(req, res) {
  Notebook.deleteNoteBook(req.body.notebookId, function(results) {
    if(results) {
      res.send({msg: '删除成功'})
    }
  })
})

router.post('/renameNoteBook', function(req, res) {
  Notebook.updateNoteBook(req.notebookId, req.newNotebookName, function(results) {
    if(results) {
      res.send({msg: '修改成功'})
    }
  })
})


module.exports = router
