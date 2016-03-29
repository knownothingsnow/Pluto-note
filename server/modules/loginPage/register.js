'use strict'
/**
 * 注册接口
 * @author Knight Young
 * @type {*|exports|module.exports}
 */

let con = require('../connectDB.js')
/**
 * 注册逻辑
 * @param {Object} user
 * @param {function} callback
 */
module.exports = (user, callback) => {
  let sql = `INSERT INTO user(userName, passWord) VALUES ("${user.newName}","${user.newPassWord}")`
  con.query(sql, function (err, results) {
    if (err) {throw err}
    callback(results)
  })
}