'use strict'
/**
 * @author Knight Young
 */
require('wangEditor/dist/css/wangEditor.min.css')
require('wangEditor/dist/js/wangEditor.min.js')

module.exports = {
  init: function() {
    //hack 将wangEditor实例绑到window对象上方便全局访问
    window.editor       = new wangEditor('editor')
    //编辑器配置
    editor.config.menus = [
      'bold',
      'underline',
      'italic',
      'strikethrough',
      'eraser',
      'forecolor',
      'bgcolor',
      '|',
      'quote',
      'fontfamily',
      'fontsize',
      'head',
      'unorderlist',
      'orderlist',
      'alignleft',
      'aligncenter',
      'alignright',
      '|',
      'link',
      'unlink',
      'table',
      '|',
      'img',
      'video',
      'location',
      'insertcode',
      '|',
      'undo',
      'redo'
    ]

    $('#editor').height(document.querySelector('html').offsetHeight - 74)

    editor.create()
  },

  clear: function() {
    // editor.clear()
    editor.$txt.html('')
  },

  append: function(html) {
    editor.$txt.append(html)
  }

}