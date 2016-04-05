'use strict'
/**
 * @author Knight Young
 */

module.exports = {

  selectAllRecords: (noteId)=> {
    console.log(`SELECT recordId, content, saveTime, type FROM record WHERE noteId=${noteId}`)
    return `SELECT recordId, content, saveTime, type FROM record WHERE noteId=${noteId}`
  },
  
  addRecord: (noteId, content, saveTime, type) => {
    return `INSERT INTO record(noteId,content,saveTime,type) VALUES (${noteId},'${content}',${saveTime},${type})`
  }

}