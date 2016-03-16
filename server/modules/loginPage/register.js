'use strict'
/**
 * 注册接口
 * @author Knight Young
 * @type {*|exports|module.exports}
 */

let inputCheck = require('./inputCheck'),
    con        = require('../connectDB.js')
/**
 * 注册逻辑
 * @param {Object} user
 * @param {function} callback
 */
function register(user, callback) {
  let sql = `INSERT INTO user(userName, passWord) VALUES ("${user.newId}","${user.newPassWord}")`
  con.query(sql, function (err, results) {
    if (err) {
      console.log(err.constructor)
    }
    callback(results)
  })
}

module.exports = register