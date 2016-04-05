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
  }
  
}