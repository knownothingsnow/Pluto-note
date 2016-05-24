'use strict'
/**
 * @author Knight Young
 */

module.exports = {

  selectAllNotebooks: (userId) => `SELECT notebookId,notebookName FROM notebook WHERE userId=${userId}`,

  addNotebook: (userId, notebookName) => `INSERT INTO notebook(userId, notebookName) VALUES (${userId},'${notebookName}')`,

  deleteNoteBook: (notebookId) => `DELETE FROM notebook WHERE notebookId='${notebookId}'`,

  updateNoteBook: (notebookId, newNotebookName) => `UPDATE notebook SET notebookName='${newNotebookName}' WHERE notebookId=${notebookId}`,

  checkNotebookName: (userId, notebookName) => `SELECT notebookName FROM notebook WHERE userId=${userId} AND notebookName='${notebookName}'`

}