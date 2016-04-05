'use strict'
/**
 * @author Knight Young
 */

module.exports = {

  selectAllNotes: (notebookId)=> {
    return `SELECT noteId, header FROM note WHERE notebookId=${notebookId}`
  },

  addNote: (notebookId, header) => {

    return `INSERT INTO note(notebookId, header) VALUES (${notebookId},'${header}')`
  }
}
