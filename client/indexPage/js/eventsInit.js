'use strict'
/**
 * @author Knight Young
 */
let handlebars = require('../../../node_modules/handlebars/dist/handlebars.min')
// let handlebars = require('handlebars')
let textEditor = require('./textEditor')

module.exports = function () {
  /*判断移动端跳转PC*/
  // var sUserAgent = navigator.userAgent.toLowerCase();
  // var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  // var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  // var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  // var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  // var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  // var bIsAndroid = sUserAgent.match(/android/i) == "android";
  // var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  // var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  // if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){
  //   window.location.href=url ;
  // }
  /**********操作笔记本的接口**********/

  //新建笔记本按钮
  $('#addNoteBook').on('click', function () {
    $('#newDataPrompt>.am-modal-dialog').children('.am-modal-hd').text('输入一个新笔记本名字')
    $('#newDataPrompt').modal({
      relatedTarget: this,
      onConfirm    : function (e) {

        $.ajax({
          url     : '/index/addNoteBook',
          data    : {
            notebookName: e.data || ''
          },
          type    : 'post',
          dataType: 'json',
          success : function (data) {
            if (data.repeat) {//输入的名字重复了
              document.querySelector('#message-alert .am-modal-hd').textContent = '您输入的名字已存在'
              $('#message-alert').modal({
                onCancel: function () {
                  $('#message>.am-modal-hd').html = null
                }
              })
            } else {//如果没重复,取得目前此用户的所有笔记本名并渲染
              let template = handlebars.compile($("#notebooksName-list-tpl")
                .html()
                .replace(/<%/g, '{{')
                .replace(/%>/g, '}}'))
              $('#notebooksName-list').html(template(data))
            }
          },
          error   : function (error) {
            console.log(error)
          }
        })

      }
    })
  })

  //删除笔记本按钮
  $('#deleteNoteBook').on('click', function () {
    $('#notebooksName-list').data('store', 'delete')
    $('#notebooksName-list button').text('删除').addClass('am-btn-danger').removeClass('hidden am-btn-warning')
  })

  //修改笔记本按钮
  $('#renameNoteBook').on('click', function () {
    $('#notebooksName-list').data('store', 'rename')
    $('#notebooksName-list button').text('重命名').addClass('am-btn-warning').removeClass('hidden am-btn-danger')
  })

  //收起侧边栏清除掉列表button的样式
  $('#notebooks-list').on('close.offcanvas.amui', function () {
    $('#notebooksName-list button').text('').addClass('hidden')
  })


  /**********操作笔记接口**********/

  // 切换笔记

  $('#notes-list').on('click', function (e) {
    console.log(e.target)
    console.log(e)
    $.ajax({
      url     : '/index/selectNote',
      data    : {
        noteId: $(e.target).parent().data('noteid')//当前的noteId
      },
      type    : 'post',
      dataType: 'json',
      success : function (data) {
        //关闭下拉菜单
        $('#notes-list').parent().dropdown('close')
        //清除编辑器内容
        textEditor.clear()
        //插入新内容
        textEditor.append(data[0].content)
      },
      error   : function (error) {
        console.log(error)
      }
    })

  })

  //添加笔记
  $('#addNote').on('click', function () {
    $('#newDataPrompt>.am-modal-dialog').children('.am-modal-hd').text('给新笔记起个名字')
    $('#newDataPrompt').modal({
      relatedTarget: this,
      onConfirm    : function (e) {

        $.ajax({
          url     : '/index/addNote',
          data    : {
            header: e.data || ''
          },
          type    : 'post',
          dataType: 'json',
          success : function (data) {

            if (data) {//重新渲染笔记列表
              data.header  = e.data
              let template = handlebars.compile($("#one-note-of-list-tpl")
                .html()
                .replace(/<%/g, '{{')
                .replace(/%>/g, '}}'))
              $('#notes-list').append(template(data))

              textEditor.clear()

              document.querySelector('#alert-msg .am-modal-hd').textContent = '新建成功'
              $('#alert-msg').modal('open')
            }
          }
        })

      }
    })
  })

  //删除笔记
  $('#deleteNote').on('click', function () {

    $.ajax({
      url     : '/index/deleteNote',
      type    : 'post',
      dataType: 'json',
      success : function (data) {

        let template = handlebars.compile($("#notes-list-tpl")
          .html()
          .replace(/<%/g, '{{')
          .replace(/%>/g, '}}'))
        $('#notes-list').html(template(data))
        textEditor.clear()
        textEditor.append(data.newContent)

        document.querySelector('#alert-msg .am-modal-hd').textContent = '删除成功'
        $('#alert-msg').modal('open')

      },
      error   : function (error) {
        console.log(error)
      }
    })

  })

  //重命名笔记
  $('#renameNote').on('click', function () {
    $('#newDataPrompt>.am-modal-dialog').children('.am-modal-hd').text('重新起一个名字吧')
    $('#newDataPrompt').modal({
      relatedTarget: this,
      onConfirm    : function (e) {

        $.ajax({
          url     : '/index/renameNote',
          data    : {
            newHeader: e.data || ''
          },
          type    : 'post',
          dataType: 'json',
          success : function (data) {
            if (data) {
              let template = handlebars.compile($("#notes-list-tpl")
                .html()
                .replace(/<%/g, '{{')
                .replace(/%>/g, '}}'))
              $('#notes-list').html(template(data))

              textEditor.clear()

              document.querySelector('#alert-msg .am-modal-hd').textContent = '重命名成功'
              $('#alert-msg').modal('open')
            }
          }
        })

      }
    })
  })

  //保存笔记
  $('#saveNote').on('click', function () {

    $.ajax({
      url     : '/index/saveNote',
      data    : {
        content: editor.$txt.html()
      },
      type    : 'post',
      dataType: 'json',
      success : function (data) {
        console.log(data)
        if (data) {
          document.querySelector('#alert-msg .am-modal-hd').textContent = '保存成功'
          $('#alert-msg').modal('open')
        }
      },
      error   : function (error) {
        console.log(error)
      }
    })

  })

}