'use strict'
/**
 * 笔记本的增删改查
 * @author Knight Young
 */
let con = require('../connectDB.js')

// todo 把这里的方法抽象出来
let noteBook = {}
/**
 * 添加笔记本
 * @param {object}notebookName
 * @param {string}userId
 * @param {function}callback
 */
noteBook.addNoteBook = function (userId, notebookName, callback) {
  let sql = `INSERT INTO notebook(notebookName, userId) VALUES ('${notebookName}',${userId})`
  con.query(sql, function (err, results) {
    if (err) {throw err}
    callback(results)
  })
}

/**
 * 删除笔记本
 * @param {string}notebookName
 * @param {function}callback
 */
noteBook.deleteNoteBook = function (notebookName, callback) {
  let sql = `DELETE FROM note WHERE notebookName='${notebookName}'`
  con.query(sql, function (err, results) {
    if (err) {throw err}
    callback(results)
  })
}

/**
 * 重命名笔记本
 * @param {string}userId
 * @param {string}newNotebookName
 * @param {string}notebookName
 * @param {function}callback
 */
noteBook.updateNoteBook = function (userId, newNotebookName, notebookName, callback) {
  let sql = `UPDATE notebook SET notebookName='${newNotebookName}' WHERE userId=${userId} AND notebookName='${notebookName}'`
  con.query(sql, function (err, results) {
    if (err) {throw err}
    callback(results)
  })
}

/**
 * 查询所有此用户的笔记本
 * @param {string}userId
 * @param {function}callback
 */
noteBook.selectAllNoteBook = function (userId, callback) {
  let sql = `SELECT notebookName FROM notebook WHERE userId=${userId}`
  con.query(sql, function (err, results) {
    if (err) {throw err}
    callback(results)
  })
}

/**
 * 查询此用户是否拥有这个笔记本,重复返回true
 * @param userId
 * @param notebookName
 * @param callback
 */
noteBook.selectOneNoteBook = function (userId, notebookName, callback) {
  let sql = `SELECT notebookName FROM notebook WHERE userId=${userId} AND notebookName='${notebookName}'`
  // console.log(sql)
  con.query(sql, function (err, results) {
    if (err) {throw err}
    // callback(results.length)
    if (results.length === 0) {//此时未重复
      callback(false)
    } else {
      callback(true)
    }
  })
}

module.exports = noteBook
