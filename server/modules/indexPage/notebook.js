'use strict'
/**
 * @author Knight Young
 */

module.exports = {
  
  selectAllNotebooks: (userId)=> {
    return `SELECT notebookId,notebookName FROM notebook WHERE userId=${userId}`
  },

  addNotebook: (userId, notebookName) => {
    return `INSERT INTO notebook(userId, notebookName) VALUES (${userId},'${notebookName}')`
  },

  deleteNoteBook: (notebookId) => {
    return `DELETE FROM notebook WHERE notebookId='${notebookId}'`
  },

  updateNoteBook: (notebookId, newNotebookName) => {
    return `UPDATE notebook SET notebookName='${newNotebookName}' WHERE notebookId=${notebookId}`
  },

  checkNotebookName: (userId, notebookName) => {
    return `SELECT notebookName FROM notebook WHERE userId=${userId} AND notebookName='${notebookName}'`
  }
  
}