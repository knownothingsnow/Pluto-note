'use strict'
/**
 * @author Knight Young
 */

module.exports=function(){
  var editor = new wangEditor('editor')
  editor.config.menus =[
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

  editor.create()
  $('div#editor').height(screen.height-230)
}
