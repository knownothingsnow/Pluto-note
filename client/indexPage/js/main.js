'use strict'

//styles
require('amazeui/dist/css/amazeui.css')
require('../scss/main.scss')

//scripts
require('amazeui/dist/js/amazeui.js')


let textEditor        = require('./textEditor.js')
let mobileEditor      = require('./mobileEditor.js')
let notebookComponent = require('./component/notebookComponent.js')
let noteComponent     = require('./component/noteComponent.js')
let recordComponent   = require('./component/recordComponent.js')
// require('./MarkdownInit.js')

$(function() {

  /*判断浏览器类型*/
  let browser = {
    versions: function() {
      let u = navigator.userAgent, app = navigator.appVersion;
      return {
        trident: u.indexOf('Trident') > - 1, //IE内核
        presto : u.indexOf('Presto') > - 1, //opera内核
        webKit : u.indexOf('AppleWebKit') > - 1, //苹果、谷歌内核
        gecko  : u.indexOf('Gecko') > - 1 && u.indexOf('KHTML') == - 1,//火狐内核
        mobile : ! ! u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios    : ! ! u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > - 1 || u.indexOf('Linux') > - 1, //android终端或者uc浏览器
        iPhone : u.indexOf('iPhone') > - 1, //是否为iPhone或者QQHD浏览器
        iPad   : u.indexOf('iPad') > - 1, //是否iPad
        webApp : u.indexOf('Safari') == - 1, //是否web应该程序，没有头部与底部
        weixin : u.indexOf('MicroMessenger') > - 1, //是否微信 （2015-01-22新增）
        qq     : u.match(/\sQQ/i) == " qq" //是否QQ
      }
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }

  if(browser.versions.mobile || browser.versions.android || browser.versions.ios) {//加载移动端编辑器

    // 初始化富文本编辑器
    mobileEditor.init()

    //加载笔记本模块
    notebookComponent(mobileEditor)

    //加载文稿模块
    noteComponent(mobileEditor)

    //加载文稿记录模块
    recordComponent(mobileEditor)

  } else {//加载PC端编辑器

    //初始化富文本编辑器
    textEditor.init()

    //加载笔记本模块
    notebookComponent(textEditor)

    //加载文稿模块
    noteComponent(textEditor)

    //加载文稿记录模块
    recordComponent(textEditor)

  }

})