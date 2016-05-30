'use strict'
/**
 * 数据库配置文件
 * Created by Knight_Young on 2016/2/18 0018.
 * @type {exports|module.exports}
 */
let mysql = require('promise-mysql')

//创建与数据库连接的实例
let con        = mysql.createPool({
  host    : '127.0.0.1',
  user    : 'root',
  password: '123asd123',
  database: 'plutonote'
  // charset : 'utf8_general_ci'
})

module.exports = con



