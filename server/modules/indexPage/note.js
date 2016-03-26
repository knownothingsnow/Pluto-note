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
note.addNote = function (content, isMarkdown, notebookId, callback) {
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
note.deleteNote = function (noteId, callback) {
  let sql = `DELETE FROM note WHERE noteId='${noteId}'`
  con.query(sql, function (err, results) {
    if (err) {throw err}
    callback(results)
  })
}

/**
 * 重命名笔记标题
 * @param noteId
 * @param newHeader
 * @param callback
 */
note.updateNoteHeader = function (noteId, newHeader, callback) {
  let sql = `UPDATE note SET header='${newHeader}' WHERE noteId=${noteId}`
  con.query(sql, function (err, results) {
    if (err) {throw err}
    callback(results)
  })
}

note.updateNoteContent = function (noteId, newContent, callback) {
  let sql = `UPDATE note SET content='${newContent}' WHERE noteId=${noteId}`
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
note.selectAllNoteHeader = function (notebookId, callback) {
  let sql = `SELECT noteId , header FROM note WHERE notebookId=${notebookId}`
  con.query(sql, function (err, results) {
    if (err) {throw err}
    callback(results)
  })
}

/**
 * 查询一篇笔记的内容
 * @param noteId
 * @param callback
 */
note.selectOneNote = function (noteId, callback) {
  let sql = `SELECT content FROM note WHERE noteId=${noteId}`
  con.query(sql, function (err, results) {
    if (err) {throw err}
    callback(results)
  })
}

module.exports = note
