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

// con.query().then(function(results) {
//   console.log(results)
// }).catch(function(error) { throw error })

let checkNotebook = function(req, res, next) {
  
  //如果用户已经登陆,收集渲染所需的所有数据,然后渲染view
  if(req.session.userId) {
    
    // 装填渲染所需要的数据
    req.session.data = {
      username: req.session.userName
    }
    
    con.query(Notebook.selectAllNotebooks(req.session.userId)).then(function(results) {
      
      //此用户没有笔记本
      if(results.length === 0) {
        
        //新建笔记本
        con.query(Notebook.addNotebook(req.session.userId, '新建笔记本')).then(function(results) {
          
          //装填notebooks
          req.session.data.notebooks = [{
            notebookId  : results.insertId,
            notebookName: '新建笔记本'
          }]
          
          //更新session.notebookId
          req.session.notebookId = results.insertId
          
          next()
          
        })
      } else {
        
        //该用户有笔记本，直接装填notebooks
        req.session.data.notebooks = results
        
        //更新session.notebookId
        req.session.notebookId = results[0].notebookId
        
        next()
        
      }
    }).catch(function(error) { throw error })
    
  } else {
    
    res.render('jump', {msg: '你还没有登录!'})
    
  }
  
}

let checkNote = function(req, res, next) {
  
  con.query(Note.selectAllNotes(req.session.notebookId)).then(function(results) {
    
    //此笔记本没有文稿
    if(results.length === 0) {
      
      //新建文稿
      con.query(Note.addNote(req.session.notebookId, '新建文稿')).then(function(results) {
        
        //装填notes
        req.session.data.notes = [{
          noteId: results.insertId,
          header: '新建文稿'
        }]
        
        //更新session.noteId
        req.session.noteId = results.insertId
        
        next()
        
      })
    } else {
      
      //该笔记本有文稿，直接装填notes
      req.session.data.notes = results
      
      //更新session.noteId
      req.session.noteId = results[0].noteId
      
      next()
      
    }
    
  }).catch(function(error) { throw error })
  
}

let checkRecord = function(req, res, next) {
  
  con.query(Record.selectAllRecords(req.session.noteId)).then(function(results) {
    
    //此用户没有文稿记录
    if(results.length === 0) {
      
      //获取当前时间
      let time = new Date(Date.now())
      let now  = time.toLocaleDateString() + ' ' + time.toString().slice(16, 24)
      
      //新建文稿记录
      con.query(Record.addRecord(req.session.noteId, '<p><br></p>', now, 0)).then(function(results) {
        
        //更新session.recordId
        req.session.recordId = results.insertId
        
        //装填records
        req.session.data.records        = [{
          recordId: results.insertId,
          content : '',
          saveTime: now,
          type    : 0
        }]
        req.session.data.defaultHeader  = req.session.data.notes[0].header
        req.session.data.defaultContent = req.session.data.records[0].content

        // console.log('recordId:' + req.session.recordId)
        // console.log('noteId:' + req.session.noteId)
        // console.log('notebookId:' + req.session.notebookId)
        // console.log(req.session.data.defaultHeader)
        // console.log(req.session.data.defaultContent)
        next()
        
      })
      
    } else {
      
      //更新session.recordId
      req.session.recordId = results[results.length - 1].recordId
      
      //该用户有文稿记录，直接装填record
      req.session.data.records = results
      for(let note of req.session.data.notes) {
        if(note.noteId == req.session.noteId) {
          req.session.data.defaultHeader = note.header
        }
      }
      req.session.data.defaultContent = req.session.data.records[req.session.data.records.length - 1].content

      // console.log('recordId:' + req.session.recordId)
      // console.log('noteId:' + req.session.noteId)
      // console.log('notebookId:' + req.session.notebookId)
      // console.log(req.session.data.defaultHeader)
      // console.log(req.session.data.defaultContent)
      next()

    }
    
  }).catch(function(error) { throw error })
  
}

//路由入口,首屏渲染
router.all('/', [checkNotebook, checkNote, checkRecord], function(req, res) {
  
  res.render('indexPage/index', req.session.data)
  
})


/**********操作文稿接口**********/

//切换文稿
router.post('/switchNote', function(req, res, next) {
  
  //更新当前的文稿ID
  req.session.noteId = req.body.noteId

  next()
  
}, checkRecord, function(req, res) {

  res.send(req.session.data)

})

//新建文稿
router.post('/addNote', function(req, res, next) {
  
  con.query(Note.addNote(req.session.notebookId, req.body.newHeader)).then(function(results) {
    
    console.log(results)
    if(results.affectedRows === 1) { next() }
    
  }).catch(function(error) { throw error })
  
}, [checkNote, checkRecord], function(req, res) {
  
  res.send(req.session.data)
  
})

//删除一篇文稿
router.post('/deleteNote', function(req, res, next) {
  
  con.query(Note.deleteNote(req.session.noteId)).then(function(results) {
    
    if(results.affectedRows === 1) { next() }
    
  }).catch(function(error) { throw error })
  
}, [checkNote, checkRecord], function(req, res) {
  
  res.send(req.session.data)
  
})

//自动或手动保存一篇文稿
router.post('/saveRecord', function(req, res, next) {
  
  con.query(Record.updateRecord(req.session.noteId, req.session.recordId, req.body.content)).then(function(results) {
    console.log(results.affectedRows)
    if(results.affectedRows === 1) { next() }
    
  }).catch(function(error) { throw error })
  
}, function(req, res) { res.send({msg: 'ok'}) })

//另存为历史版本
router.post('/addRecord', function(req, res, next) {
  let time = new Date(Date.now())
  let now  = time.toLocaleDateString() + ' ' + time.toString().slice(16, 24)

  con.query(Record.addRecord(req.session.noteId, req.body.content, now, req.body.type)).then(function(results) {
    
    if(results.affectedRows === 1) { next() }
    
  }).catch(function(error) { throw error })
  
}, checkRecord, function(req, res) {
  
  res.send(req.session.data)
  
})

//重命名一篇文稿
router.post('/renameNote', function(req, res, next) {
  
  con.query(Note.renameNote(req.session.noteId, req.body.newHeader)).then(function(results) {

    if(results.affectedRows === 1) { next() }

  }).catch(function(error) { throw error })
  
}, [checkNote, checkRecord], function(req, res) {

  res.send(req.session.data)

})


/**********操作笔记本的接口**********/

/**
 * 添加笔记本接口
 */
router.post('/addNoteBook', function(req, res, next) {
  // 如果传入的笔记本名已经存在就返回{repeat: true}
  con.query(Notebook.checkNotebookName(req.session.userId, req.body.notebookName)).then(function(results) {
    console.log(results)
    results.length !== 0 ? res.send({repeat: true}) : next()
    
  }).catch(function(error) { throw error })
  
}, function(req, res, next) {
  
  con.query(Notebook.addNotebook(req.session.userId, req.body.notebookName)).then(function(results) {
    console.log('addNotebook')
    if(results.affectedRows === 1) {
      next()
    }
    
  }).catch(function(error) { throw error })
  
}, [checkNotebook, checkNote, checkRecord], function(req, res) {
  
  req.session.data.repeat = false
  console.log(req.session.data.notebooks)
  res.send(req.session.data)
  
})

/**
 * 删除笔记本接口
 */
router.post('/deleteNoteBook', function(req, res, next) {
  
  con.query(Notebook.deleteNoteBook(req.body.notebookId)).then(function(results) {
    
    if(results.affectedRows === 1) { next() }
    
  }).catch(function(error) { throw error })
  
}, [checkNotebook, checkNote, checkRecord], function(req, res) {
  
  console.log(req.session.data.notebooks)
  res.send(req.session.data)
  
})

/**
 * 重命名笔记本接口
 */
router.post('/renameNoteBook', function(req, res, next) {
  // 如果传入的笔记本名已经存在就返回{repeat: true}
  con.query(Notebook.checkNotebookName(req.session.userId, req.body.newNotebookName)).then(function(results) {
    console.log(results)
    results.length !== 0 ? res.send({repeat: true}) : next()
    
  }).catch(function(error) { throw error })
  
}, function(req, res, next) {
  
  con.query(Notebook.updateNoteBook(req.body.notebookId, req.body.newNotebookName)).then(function(results) {
    console.log(results.affectedRows)
    if(results.affectedRows === 1) { next() }
    
  }).catch(function(error) { throw error })
  
}, [checkNotebook, checkNote, checkRecord], function(req, res) {
  
  req.session.data.repeat = false
  console.log(req.session.data.notebooks)
  res.send(req.session.data)
  
})

router.post('/switchNotebook', function(req, res, next) {
  console.log(req.body.notebookId)
  req.session.notebookId = req.body.notebookId
  next()
}, [checkNote, checkRecord], function(req, res) {
  res.send(req.session.data)
})


module.exports = router
