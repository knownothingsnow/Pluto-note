'use strict'
/**
 * @author Knight Young
 */
require('../css/wangEditor-mobile.min.css')
window.Zepto = $ = require('webpack-zepto')
// window.Zepto=$=require('../js/lib/zepto')
require('../js/lib/zepto.touch')
require('../js/lib/wangEditor-mobile.min.js')

module.exports = {
  init: function() {
    //hack 将wangEditor实例绑到window对象上方便全局访问
    window.editor = new ___E('editor')
editor.config.menus=[
  'head',
  'bold',
  'color',
  'quote',
  'list',
  'check'
]
    $('#editor').height(document.querySelector('html').offsetHeight - 74)

    editor.init()
  },

  clear: function() {
    // editor.clear()
    editor.$txt.html('')
  },

  append: function(html) {
    editor.$txt.append(html)
  }

}