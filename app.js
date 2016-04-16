'use strict'
/**
 * 后端入口文件
 * @type {*|exports|module.exports}
 * @author Knight Young
 */
let express      = require('express'),
    path         = require('path'),
    favicon      = require('serve-favicon'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    session      = require('express-session'),
    handlebars   = require('express-handlebars')

let isDev        = process.env.NODE_ENV !== 'production'
let app          = express()
let AllInterface = require('./server/routes/All-interface')
let port         = 3000

app.engine('.hbs', handlebars({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', path.resolve('./server/views'))

app.locals.env    = process.env.NODE_ENV || 'dev'
app.locals.reload = true

if(isDev) {

  app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')))
  app.use(logger('dev'))

  app.use(bodyParser.json())//加载解析json的中间件
  app.use(bodyParser.urlencoded({extended: false}))//加载解析urlencoded请求体的中间件

  app.use(cookieParser())//加载解析cookie的中间件
  app.use(cookieParser('Wilson'))

  app.use(express.static(path.join(__dirname, 'client')))//设置client文件夹为存放静态文件的目录
  
  app.use(session({
    name             : 'Pluto',//表示cookie的name，默认cookie的name是：connect.sid
    secret           : 'secret', //用来对session数据进行加密的字符串.这个属性值为必须指定的属性
    resave           : true,//是指每次请求都重新设置session cookie，假设你的cookie是6000毫秒过期，每次请求都会再设置6000毫秒
    saveUninitialized: false,//是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
    cookie           : {maxAge: 3600 * 1000} // 过期时间（毫秒）
  }))

  //启用路由控制器
  AllInterface(app)

  let reload = require('reload')
  let http   = require('http')

  let server = http.createServer(app)
  reload(server, app)

  server.listen(port, function() {
    console.log('App (dev) is now running on port 3000!')
  })
} else {

  // static assets served by express.static() for production
  app.use(express.static(path.join(__dirname, 'public')))

  //启用路由
  AllInterface(app)

  app.listen(port, function() {
    console.log('App (production) is now running on port 3000!')
  })
}
