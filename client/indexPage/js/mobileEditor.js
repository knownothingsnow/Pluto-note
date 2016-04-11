'use strict'
/**
 * @author Knight Young
 */
//style
require('../css/wangEditor-mobile.min.css')

//script
window.Zepto = $ = require('webpack-zepto')
require('../js/lib/zepto.touch')
require('../js/lib/wangEditor-mobile.min.js')

module.exports = {

  init: ()=> {

    //hack 将编辑器实例绑到window对象上方便全局访问
    window.editor = new ___E('editor')

    //编辑器配置项
    editor.config.menus = [
      'head',
      'bold',
      'color',
      'quote',
      'list',
      'check'
    ]

    //传入编辑器初始化高度
    $('#editor').height(document.querySelector('html').offsetHeight - 74)

    editor.init()

  },

  clear: ()=> {
    editor.$txt.html('')
  },

  append: (html)=> {
    editor.$txt.append(html)
  }

}