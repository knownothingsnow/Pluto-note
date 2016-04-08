'use strict'
/**
 * @author Knight Young
 */

module.exports = {

  selectAllRecords: (noteId)=> {
    let sql = `SELECT recordId, content, saveTime, type FROM record WHERE noteId=${noteId}`
    console.log('selectAllRecords-->' + sql)
    return sql
  },
  
  addRecord: (noteId, content, saveTime, type) => {
    let sql = `INSERT INTO record(noteId,content,saveTime,type) VALUES (${noteId},'${content}','${saveTime}',${type})`
    console.log('addRecord-->' + sql)
    return sql
  }

}