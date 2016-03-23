'use strict'

//styles
require('amazeui/dist/css/amazeui.css')
require('wangEditor/dist/css/wangEditor.min.css')
require('../scss/main.scss')

//scripts
require('amazeui/dist/js/amazeui.js')
require('wangEditor/dist/js/wangEditor.min.js')

let editorInit=require('./editorInit.js')
let eventsInit=require('./eventsInit.js')
// require('./MarkdownInit.js')

$(function(){
  //初始化富文本编辑器
  editorInit()
  //加载事件绑定
  eventsInit()
})

// var Parser = require('hyperdown');
// var parser = new Parser();
// parser.makeHtml('#mdtext#')