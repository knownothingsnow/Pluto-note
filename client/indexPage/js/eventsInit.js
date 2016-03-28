'use strict'
/**
 * @author Knight Young
 */
let handlebars = require('../../../node_modules/handlebars/dist/handlebars.min')
let textEditor = require('./textEditor')

module.exports = function () {
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

  /**********操作笔记接口**********/

  //切换笔记
  $('#notes-list').on('change', function () {
    $.ajax({
      url     : '/index/selectNote',
      data    : {
        noteId: $(this).val()//当前的noteId
      },
      type    : 'post',
      dataType: 'json',
      success : function (data) {
        textEditor.clear()
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
            if (data) {
              //hack 异步修改dom时遇到问题,暂时通过刷新页面解决
              location.reload()
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
        noteId : $('#notes-list').val(),
        content: editor.$txt.html()
      },
      type    : 'post',
      dataType: 'json',
      success : function (data) {
        console.log(data)
        if (data) {
          //todo 使用js收起下拉菜单,出现一个弹框,去掉此处alert
          alert('success!!')
        }
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
            noteId   : $('#notes-list').val(),
            newHeader: e.data || ''
          },
          type    : 'post',
          dataType: 'json',
          success : function (data) {
            if (data) {
              //hack 异步修改dom时遇到问题,暂时通过刷新页面解决
              location.reload()
              // let template = handlebars.compile($("#notes-list-tpl")
              //   .html()
              //   .replace(/<%/g, '{{')
              //   .replace(/%>/g, '}}'))
              // console.log(template(data))
              // $('#notes-list').html(template(data))
            }
          }
        })

      }
    })
  })

  //保存笔记
  $('#deleteNote').on('click', function () {
    $.ajax({
      url     : '/index/deleteNote',
      type    : 'post',
      dataType: 'json',
      success : function (data) {
        console.log(data)
        if (data) {
          location.reload()
        }
      },
      error   : function (error) {
        console.log(error)
      }
    })
  })
}