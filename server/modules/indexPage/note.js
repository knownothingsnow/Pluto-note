'use strict'
/**
 * 单篇笔记的增删改查
 * @author Knight Young
 */

let con = require('../connectDB.js')

// todo 把这里的方法抽象出来
module.exports={

  /**
   * 添加笔记
   * @param header
   * @param notebookId
   * @param saveTime
   * @param callback
   */
  addNote: (header, notebookId,saveTime, callback) => {

    // let sql = `INSERT INTO note(content, isMarkdown, notebookId) VALUES ('${content}',${isMarkdown},${notebookId})`
    let sql = `INSERT INTO note(header, notebookId, saveTime) VALUES ('${header}',${notebookId},'${saveTime}')`
    console.log('sql:' + sql)

    con.query(sql, function (err, results) {

      if (err) {throw err}

      callback(results)

    })
  },

  /**
   * 删除笔记
   * @param {string}noteId
   * @param {function}callback
   */
  deleteNote: (noteId, callback) => {

    let sql = `DELETE FROM note WHERE noteId='${noteId}'`
    console.log('sql:' + sql)

    con.query(sql, function (err, results) {

      if (err) {throw err}

      callback(results)

    })
  },

  /**
   * 更新笔记标题
   * @param noteId
   * @param newHeader
   * @param callback
   */
  updateNoteHeader: (noteId, newHeader, callback) => {

    let sql = `UPDATE note SET header='${newHeader}' WHERE noteId=${noteId}`
    console.log('sql:' + sql)

    con.query(sql, function (err, results) {

      if (err) {throw err}

      callback(results)

    })
  },

  /**
   * 更新笔记内容
   * @param noteId
   * @param newContent
   * @param callback
   */
  updateNoteContent: (noteId, newContent, callback) => {

    let sql = `UPDATE note SET content='${newContent}' WHERE noteId=${noteId}`
    console.log('sql:' + sql)

    con.query(sql, function (err, results) {

      if (err) {throw err}

      callback(results)

    })
  },

  /**
   * 查询所有此笔记本内的笔记标题
   * @param notebookId
   * @param callback
   */
  selectAllNoteHeader: (notebookId, callback) => {

    let sql = `SELECT noteId,header FROM note WHERE notebookId=${notebookId}`
    console.log('sql:' + sql)

    con.query(sql, function (err, results) {

      if (err) {throw err}

      callback(results)

    })
  },

  /**
   * 查询一篇笔记的内容
   * @param noteId
   * @param callback
   */
  selectOneNoteContent: (noteId, callback) => {

    let sql = `SELECT content FROM note WHERE noteId=${noteId}`
    console.log('sql:' + sql)

    con.query(sql, function (err, results) {

      if (err) {throw err}

      callback(results)

    })
  },

  /**
   * 查询一篇笔记的标题
   * @param noteId
   * @param callback
   */
  selectOneNoteHeader: (noteId, callback) => {

    let sql = `SELECT header FROM note WHERE noteId=${noteId}`
    console.log('sql:' + sql)

    con.query(sql, function (err, results) {

      if (err) {throw err}

      callback(results)

    })
  }

}