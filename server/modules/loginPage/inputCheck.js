'use strict'
/**
 * 返回对用户ID和密码的查询结果
 * @author Knight Young
 * @type {con|exports|module.exports}
 */

let con = require('../connectDB.js')

/**
 * 查询用户在表中是否存在,此处查询不到会返回空数组
 * @param {Object} user
 * @param {function} callback
 */
module.exports=  (user, callback) => {

  let sql = `SELECT userId,userName, passWord FROM user WHERE userName="${user.userName || user.newName}" and passWord="${user.userPassWord || user.newPassWord}"`

  con.query(sql, function (error, results) {
    if (error) {throw error}

    if (results.length === 0) {

      callback(false)

    } else {

      callback(results)

    }
  })
}

