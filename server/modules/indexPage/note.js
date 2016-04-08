'use strict'
/**
 * @author Knight Young
 */

module.exports = {

  selectAllNotes: (notebookId)=> {

    let sql = `SELECT noteId, header FROM note WHERE notebookId=${notebookId}`
    console.log('selectAllNotes-->' + sql)
    return sql

  },

  addNote: (notebookId, header) => {

    let sql = `INSERT INTO note(notebookId, header) VALUES (${notebookId},'${header}')`
    console.log('selectAllNotes-->' + sql)
    return sql

  },

  deleteNote: (noteId) => {

    let sql = `DELETE FROM note WHERE noteId='${noteId}'`
    console.log('deleteNote-->' + sql)
    return sql

  },
  renameNote: (noteId, newHeader) => {

    let sql = `UPDATE note SET header='${newHeader}' WHERE noteId=${noteId}`
    console.log('renameNote-->' + sql)
    return sql
  }
}
