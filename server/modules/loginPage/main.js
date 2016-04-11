'use strict'
/**
 * @author Knight Young
 */
module.exports = {
  
  inputCheck:(input)=> {
    return `SELECT userId,userName, passWord FROM user WHERE userName="${input.userName || input.newName}" and passWord="${input.userPassWord || input.newPassWord}"`
  },

  register:(user) => {
    return `INSERT INTO user(userName, passWord) VALUES ("${user.newName}","${user.newPassWord}")`
  }
  
}