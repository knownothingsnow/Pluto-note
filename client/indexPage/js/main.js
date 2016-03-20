'use strict'
//styles
require('amazeui/dist/css/amazeui.css')
require('wangEditor/dist/css/wangEditor.min.css')
require('../scss/main.scss')

//scripts
require('amazeui/dist/js/amazeui.js')
require('wangEditor/dist/js/wangEditor.min.js')

let init=require('./editor_init.js')
// require('./init.js')

$(function(){
  //初始化富文本编辑器
  init()
})

// var Parser = require('hyperdown');
// var parser = new Parser();
// parser.makeHtml('#mdtext#')