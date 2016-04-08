'use strict'
/**
 * @author Knight Young
 */

module.exports = {
  
  selectAllNotebooks: (userId)=> {
    
    let sql = `SELECT notebookId,notebookName FROM notebook WHERE userId=${userId}`
    console.log('selectAllNotebooks-->'+ sql)
    return sql
    
  },

  addNotebook: (userId, notebookName) => {

    let sql = `INSERT INTO notebook(userId, notebookName) VALUES (${userId},'${notebookName}')`
    console.log('addNotebook-->'+ sql)
    return sql

  },

  deleteNoteBook: (notebookId) => {

    let sql = `DELETE FROM notebook WHERE notebookId='${notebookId}'`
    console.log('deleteNoteBook-->'+ sql)
    return sql

  },

  updateNoteBook: (notebookId, newNotebookName) => {

    let sql = `UPDATE notebook SET notebookName='${newNotebookName}' WHERE notebookId=${notebookId}`
    console.log('updateNoteBook-->'+ sql)
    return sql
    
  },

  checkNotebookName: (userId, notebookName) => {

    let sql = `SELECT notebookName FROM notebook WHERE userId=${userId} AND notebookName='${notebookName}'`
    console.log('checkNotebookName-->'+ sql)
    return sql

  }
}