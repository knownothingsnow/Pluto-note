'use strict'
/**
 * @author Knight Young
 */

module.exports = {

  selectAllNotes: (notebookId) => `SELECT noteId, header FROM note WHERE notebookId=${notebookId}`,

  addNote: (notebookId, header) => `INSERT INTO note(notebookId, header) VALUES (${notebookId},'${header}')`,

  deleteNote: (noteId) => `DELETE FROM note WHERE noteId='${noteId}'`,

  renameNote: (noteId, newHeader) => `UPDATE note SET header='${newHeader}' WHERE noteId=${noteId}`

}
