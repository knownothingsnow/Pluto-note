'use strict'
/**
 * 主页面路由逻辑
 * @author Knight Young
 * @type {*|exports|module.exports}
 */
let express  = require('express'),
    Notebook = require('../modules/indexPage/noteBook'),
    Note     = require('../modules/indexPage/note'),
    Record   = require('../modules/indexPage/record'),
    con      = require('../modules/connectDB.js')

let router = express.Router()

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
    
  } else { res.render('jump', {msg: '你还没有登录!'}) }
  
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
          saveTime: now
        }]
        req.session.data.defaultHeader  = req.session.data.notes[0].header
        req.session.data.defaultContent = req.session.data.records[0].content

        next()
        
      })
      
    } else {
      
      //更新session.recordId
      req.session.recordId = results[results.length - 1].recordId
      
      //该用户有文稿记录，直接装填record
      req.session.data.records = results

      //将defaultHeader更新为当前noteId对应的header
      for(let note of req.session.data.notes) {
        if(note.noteId == req.session.noteId) {
          req.session.data.defaultHeader = note.header
        }
      }

      //defaultContent默认装填最新的文稿记录
      req.session.data.defaultContent = req.session.data.records[req.session.data.records.length - 1].content

      next()

    }
    
  }).catch(function(error) { throw error })
  
}

//路由入口,首屏渲染
router.all('/', [checkNotebook, checkNote, checkRecord], function(req, res) {
  
  res.render('indexPage/index', req.session.data)
  
})


/**********操作文稿接口**********/

/**
 * 切换文稿
 */
router.post('/switchNote', function(req, res, next) {
  
  //更新当前的文稿ID
  req.session.noteId = req.body.noteId

  next()
  
}, checkRecord, function(req, res) {

  res.send(req.session.data)

})

/**
 * 新建文稿
 */
router.post('/addNote', function(req, res, next) {
  
  con.query(Note.addNote(req.session.notebookId, req.body.newHeader)).then(function(results) {

    if(results.affectedRows === 1) { next() }
    
  }).catch(function(error) { throw error })
  
}, [checkNote, checkRecord], function(req, res) {
  
  res.send(req.session.data)
  
})

/**
 * 删除文稿
 */
router.post('/deleteNote', function(req, res, next) {
  
  con.query(Note.deleteNote(req.session.noteId)).then(function(results) {
    
    if(results.affectedRows === 1) { next() }
    
  }).catch(function(error) { throw error })
  
}, [checkNote, checkRecord], function(req, res) {
  
  res.send(req.session.data)
  
})

/**
 * 自动或手动保存文稿
 */
router.post('/saveRecord', function(req, res, next) {
  
  con.query(Record.updateRecord(req.session.noteId, req.session.recordId, req.body.content)).then(function(results) {

    if(results.affectedRows === 1) { next() }
    
  }).catch(function(error) { throw error })
  
}, function(req, res) { res.send({msg: 'ok'}) })

/**
 * 另存为历史版本
 */
router.post('/addRecord', function(req, res, next) {

  //生成当前时间字符串
  let time = new Date(Date.now())
  let now  = time.toLocaleDateString() + ' ' + time.toString().slice(16, 24)

  con.query(Record.addRecord(req.session.noteId, req.body.content, now)).then(function(results) {
    
    if(results.affectedRows === 1) { next() }
    
  }).catch(function(error) { throw error })
  
}, checkRecord, function(req, res) {
  
  res.send(req.session.data)
  
})

/**
 * 重命名文稿
 */
router.post('/renameNote', function(req, res, next) {
  
  con.query(Note.renameNote(req.session.noteId, req.body.newHeader)).then(function(results) {

    if(results.affectedRows === 1) { next() }

  }).catch(function(error) { throw error })
  
}, [checkNote, checkRecord], function(req, res) {

  res.send(req.session.data)

})


/**********操作笔记本的接口**********/

/**
 * 添加笔记本
 */
router.post('/addNoteBook', function(req, res, next) {
  // 如果传入的笔记本名已经存在就返回{repeat: true}
  con.query(Notebook.checkNotebookName(req.session.userId, req.body.notebookName)).then(function(results) {

    results.length !== 0 ? res.send({repeat: true}) : next()
    
  }).catch(function(error) { throw error })
  
}, function(req, res, next) {
  
  con.query(Notebook.addNotebook(req.session.userId, req.body.notebookName)).then(function(results) {

    if(results.affectedRows === 1) { next() }
    
  }).catch(function(error) { throw error })
  
}, [checkNotebook, checkNote, checkRecord], function(req, res) {
  
  req.session.data.repeat = false

  res.send(req.session.data)
  
})

/**
 * 删除笔记本
 */
router.post('/deleteNoteBook', function(req, res, next) {
  
  con.query(Notebook.deleteNoteBook(req.body.notebookId)).then(function(results) {
    
    if(results.affectedRows === 1) { next() }
    
  }).catch(function(error) { throw error })
  
}, [checkNotebook, checkNote, checkRecord], function(req, res) {

  res.send(req.session.data)
  
})

/**
 * 重命名笔记本
 */
router.post('/renameNoteBook', function(req, res, next) {
  // 如果传入的笔记本名已经存在就返回{repeat: true}
  con.query(Notebook.checkNotebookName(req.session.userId, req.body.newNotebookName)).then(function(results) {

    results.length !== 0 ? res.send({repeat: true}) : next()
    
  }).catch(function(error) { throw error })
  
}, function(req, res, next) {
  
  con.query(Notebook.updateNoteBook(req.body.notebookId, req.body.newNotebookName)).then(function(results) {

    if(results.affectedRows === 1) { next() }
    
  }).catch(function(error) { throw error })
  
}, [checkNotebook, checkNote, checkRecord], function(req, res) {
  
  req.session.data.repeat = false

  res.send(req.session.data)
  
})

/**
 * 切换笔记本
 */
router.post('/switchNotebook', function(req, res, next) {

  req.session.notebookId = req.body.notebookId

  next()

}, [checkNote, checkRecord], function(req, res) {

  res.send(req.session.data)

})

/**
 * 切换文稿记录
 */
router.post('/switchRecord', function(req, res, next) {

  next()

}, [checkRecord], function(req, res) {

  req.session.recordId = req.body.recordId

  //将defaultContent修正为所选文稿记录的content
  for(let record of req.session.data.records) {
    if(record.recordId == req.session.recordId) {
      req.session.data.defaultContent = record.content
    }
  }

  res.send(req.session.data)

})

/**
 * 删除文稿记录
 */
router.post('/deleteRecord', function(req, res, next) {

  con.query(Record.deleteRecord(req.body.recordId)).then(function(results) {

    if(results.affectedRows === 1) { next() }

  }).catch(function(error) { throw error })

}, [checkRecord], function(req, res) {

  res.send(req.session.data)

})

module.exports = router
// con.query().then(function(results) {
//   console.log(results)
// }).catch(function(error) { throw error })