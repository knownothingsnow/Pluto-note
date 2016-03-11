"use strict"

require('amazeui/dist/css/amazeui.css')
require('amazeui/dist/js/amazeui.js')
var speak=require('./test.js')

let $=require('jquery')

$('#aa').on('click',function(){
  speak.speak();
})
