'use strict'

//styles
require('amazeui/dist/css/amazeui.css')
require('../scss/main.scss')

//scripts
require('amazeui/dist/js/amazeui.js')

let textEditor        = require('./textEditor.js'),
    mobileEditor      = require('./mobileEditor.js'),
    notebookComponent = require('./component/notebookComponent.js'),
    noteComponent     = require('./component/noteComponent.js'),
    recordComponent   = require('./component/recordComponent.js')

$(function() {

  /*判断浏览器类型*/
  let browser = {
    versions: function() {
      let u = navigator.userAgent
      return {
        mobile : ! ! u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios    : ! ! u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > - 1 || u.indexOf('Linux') > - 1, //android终端或者uc浏览器
        iPhone : u.indexOf('iPhone') > - 1, //是否为iPhone或者QQHD浏览器
        iPad   : u.indexOf('iPad') > - 1 //是否iPad
      }
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }

  //加载移动端编辑器条件
  if(browser.versions.mobile || browser.versions.android || browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {

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