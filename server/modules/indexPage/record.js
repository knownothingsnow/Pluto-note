'use strict'
/**
 * @author Knight Young
 */

module.exports = {
  
  selectAllRecords: (noteId)=> {
    return `SELECT recordId, content, saveTime FROM record WHERE noteId=${noteId}`
  },
  
  addRecord: (noteId, content, saveTime) => {
    return `INSERT INTO record(noteId,content,saveTime) VALUES (${noteId},'${content}','${saveTime}')`
  },

  updateRecord: (noteId,recordId, newContent) => {
    return `UPDATE record SET content='${newContent}' WHERE noteId=${noteId} AND recordId=${recordId}`
  },

  deleteRecord: (recordId) => {
    return `DELETE FROM record WHERE recordId='${recordId}'`
  }
  
}