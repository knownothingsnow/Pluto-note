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
            console.log("更新error:" + error)
          }
        })
      }
    })
  })

  /**********操作笔记接口**********/

  //笔记切换
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
        console.log("更新error:" + error)
      }
    })
  })

  //笔记保存
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
          alert('success!!')
        }
      },
      error   : function (error) {
        console.log("更新error:" + error)
      }
    })
  })

  $('#renameNote').on('click', function () {
    $('#newDataPrompt>.am-modal-dialog').children('.am-modal-hd').text('输入这篇笔记的新名字')
    $('#newDataPrompt').modal({
      relatedTarget: this,
      onConfirm    : function (e) {
        let newHeader = e.data
        $.ajax({
          url     : '/index/renameNote',
          data    : {
            noteId   : $('#notes-list').val(),
            newHeader: newHeader || ''
          },
          type    : 'post',
          dataType: 'json',
          success : function (data) {
            if (data) {
              let template = handlebars.compile($("#notes-list-tpl")
                .html()
                .replace(/<%/g, '{{')
                .replace(/%>/g, '}}'))
              $('#notebooksName-list').html(template(data))
            }
          }
        })
      }
    })
  })
}