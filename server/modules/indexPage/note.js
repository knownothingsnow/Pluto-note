'use strict'
/**
 * 单篇笔记的增删改查
 * @author Knight Young
 */

let con = require('../connectDB.js')

// todo 把这里的方法抽象出来
let note = {}
/**
 * 添加笔记
 * @param content
 * @param isMarkdown
 * @param notebookId
 * @param callback
 */
note.addNoteBook = function (content, isMarkdown, notebookId, callback) {
  let sql = `INSERT INTO note(content, isMarkdown, notebookId) VALUES ('${content}',${isMarkdown},${notebookId})`
  con.query(sql, function (err, results) {
    if (err) {throw err}
    callback(results)
  })
}

/**
 * 删除笔记
 * @param {string}noteId
 * @param {function}callback
 */
note.deleteNoteBook = function (noteId, callback) {
  let sql = `DELETE FROM note WHERE noteId='${noteId}'`
  con.query(sql, function (err, results) {
    if (err) {throw err}
    callback(results)
  })
}

/**
 * 重命名笔记
 * @param notebookId
 * @param newheader
 * @param header
 * @param callback
 */
note.updateNoteBook = function (notebookId, newheader, header, callback) {
  let sql = `UPDATE note SET header='${newheader}' WHERE notebookId=${notebookId} AND header='${header}'`
  con.query(sql, function (err, results) {
    if (err) {throw err}
    callback(results)
  })
}

/**
 * 查询所有此笔记本内的笔记标题
 * @param notebookId
 * @param callback
 */
note.selectAllNoteBook = function (notebookId, callback) {
  let sql = `SELECT noteId , header FROM note WHERE notebookId=${notebookId}`
  con.query(sql, function (err, results) {
    if (err) {throw err}
    callback(results)
  })
}

module.exports = note
