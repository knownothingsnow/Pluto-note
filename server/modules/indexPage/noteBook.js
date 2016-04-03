'use strict'
/**
 * 笔记本的增删改查
 * @author Knight Young
 */
let con        = require('../connectDB.js')
// todo 把这里的方法抽象出来
module.exports = {
  /**
   * 添加笔记本
   * @param {object}notebookName
   * @param {string}userId
   * @param {function}callback
   */
  addNoteBook: (userId, notebookName, callback) => {

    let sql = `INSERT INTO notebook(notebookName, userId) VALUES ('${notebookName}',${userId})`
    console.log('addNoteBook')
    console.log('sql:' + sql)

    con.query(sql, function(err, results) {

      if(err) {throw err}

      callback(results)

    })
  }
  ,

  /**
   * 删除笔记本
   * @param {string}notebookId
   * @param {function}callback
   */
  deleteNoteBook: (notebookId, callback) => {

    let sql = `DELETE FROM note WHERE notebookId='${notebookId}'`
    console.log('deleteNoteBook')
    console.log('sql:' + sql)

    con.query(sql, function(err, results) {

      if(err) {throw err}

      callback(results)

    })
  },

  /**
   * 重命名笔记本
   * @param {string}notebookId
   * @param {string}newNotebookName
   * @param {function}callback
   */
  updateNoteBook: (notebookId, newNotebookName, callback) => {

    let sql = `UPDATE notebook SET notebookName='${newNotebookName}' WHERE notebookId=${notebookId}`
    console.log('updateNoteBook')
    console.log('sql:' + sql)

    con.query(sql, function(err, results) {

      if(err) {throw err}

      callback(results)

    })
  },

  /**
   * 查询所有此用户的笔记本名
   * @param {string}userId
   * @param {function}callback
   */
  selectAllNoteBooksName: (userId, callback) => {

    let sql = `SELECT notebookName FROM notebook WHERE userId=${userId}`
    console.log('selectAllNoteBooksName')
    console.log('sql:' + sql)

    con.query(sql, function(err, results) {

      if(err) {throw err}

      results ? callback(results) : callback(false)

    })
  },

  /**
   * 查询所有此用户的笔记本ID
   * @param {string}userId
   * @param {function}callback
   */
  selectAllNoteBooksId: (userId, callback) => {

    let sql = `SELECT notebookId FROM notebook WHERE userId=${userId}`
    console.log('selectAllNoteBooksId')
    console.log('sql:' + sql)

    con.query(sql).then(function(err, results) {
      
      if(err) {throw err}

      results.length !== 0 ? callback(results) : callback(false)

    })
  },

  /**
   * 查询此用户是否拥有这个笔记本,重复返回true
   * @param userId
   * @param notebookName
   * @param callback
   */
  checkNotebookName: (userId, notebookName, callback) => {

    let sql = `SELECT notebookName FROM notebook WHERE userId=${userId} AND notebookName='${notebookName}'`
    console.log('checkNotebookName')
    console.log('sql' + sql)

    con.query(sql, function(err, results) {

      if(err) {throw err}

      //未重复返回false
      results.length === 0 ? callback(false) : callback(true)

    })
  }
}