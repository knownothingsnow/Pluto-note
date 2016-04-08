'use strict'

//styles
require('amazeui/dist/css/amazeui.css')
require('wangEditor/dist/css/wangEditor.min.css')
require('../scss/main.scss')
// require('../css/wangEditor-mobile.min.css')

//scripts
require('amazeui/dist/js/amazeui.js')
require('wangEditor/dist/js/wangEditor.min.js')
// require('../js/lib/zepto')
// require('../js/lib/zepto.touch')
// require('../js/lib/wangEditor-mobile.min.js')
// window.Zepto = require('webpack-zepto')

let textEditor        = require('./textEditor.js')
let notebookComponent = require('./component/notebookComponent.js')
let noteComponent     = require('./component/noteComponent.js')
let recordComponent   = require('./component/recordComponent.js')
// require('./MarkdownInit.js')

$(function() {

  // /*判断移动端跳转PC*/
  // var sUserAgent  = navigator.userAgent.toLowerCase();
  // var bIsIpad     = sUserAgent.match(/ipad/i) == "ipad";
  // var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  // var bIsMidp     = sUserAgent.match(/midp/i) == "midp";
  // var bIsUc7      = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  // var bIsUc       = sUserAgent.match(/ucweb/i) == "ucweb";
  // var bIsAndroid  = sUserAgent.match(/android/i) == "android";
  // var bIsCE       = sUserAgent.match(/windows ce/i) == "windows ce";
  // var bIsWM       = sUserAgent.match(/windows mobile/i) == "windows mobile";
  // if(! (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
  //   window.location.href = url;
  // }

  //初始化富文本编辑器
  textEditor.init()

  //加载笔记本模块
  notebookComponent()

  //加载文稿模块
  noteComponent()

  //加载文稿记录模块
  recordComponent()


})