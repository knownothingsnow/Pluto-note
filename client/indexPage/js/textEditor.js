'use strict'
/**
 * @author Knight Young
 */

let textEditor = {}

textEditor.init = function () {
  //hack 将wangEditor实例绑到window对象上方便全局访问
  window.editor          = new wangEditor('editor')
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
    'emotion',
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
}

textEditor.clear=function () {
  editor.clear()
}

textEditor.append=function (html) {
  editor.$txt.append(html)
}

module.exports  = textEditor