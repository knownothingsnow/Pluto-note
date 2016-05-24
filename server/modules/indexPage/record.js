'use strict'
/**
 * @author Knight Young
 */

module.exports = {

  selectAllRecords: (noteId) => `SELECT recordId, content, saveTime FROM record WHERE noteId=${noteId}`,

  addRecord: (noteId, content, saveTime) => `INSERT INTO record(noteId,content,saveTime) VALUES (${noteId},'${content}','${saveTime}')`,

  updateRecord: (noteId, recordId, newContent) => `UPDATE record SET content='${newContent}' WHERE noteId=${noteId} AND recordId=${recordId}`,

  deleteRecord: (recordId) => `DELETE FROM record WHERE recordId='${recordId}'`

}