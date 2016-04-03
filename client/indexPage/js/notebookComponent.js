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

  //删除笔记本按钮
  $('#deleteNoteBook').on('click', ()=> {
    $('#notebooksName-list').data('store', 'delete')
    $('#notebooksName-list button').text('删除').addClass('am-btn-danger').removeClass('hidden am-btn-warning')
  })

  //修改笔记本按钮
  $('#renameNoteBook').on('click', ()=> {
    $('#notebooksName-list').data('store', 'rename')
    $('#notebooksName-list button').text('重命名').addClass('am-btn-warning').removeClass('hidden am-btn-danger')

  })

  //收起侧边栏清除掉列表button的样式
  $('#notebooks-list').on('close.offcanvas.amui', function () {
    $('#notebooksName-list button').text('').addClass('hidden')
  })

  //列表中的删除和重命名功能
  $('#notebooks-list ul').on('click', (e)=> {
    let url
    let $store          = $('#notebooksName-list').data('store')
    let $thisnotebookId = $(e.target).data('notebookid')
    switch ($store) {
      case 'delete':
      {
        $.ajax({
          url     : '/index/deleteNoteBook',
          data    : {
            notebookId: $thisnotebookId //当前的notebookId
          },
          type    : 'post',
          dataType: 'json',
          success : function (data) {

            console.log(data)

            //弹出提示信息
            document.querySelector('#alert-msg .am-modal-hd').textContent = data.msg
            $('#alert-msg').modal('open')

            //清除编辑器内容
            textEditor.clear()
            //插入新内容
            textEditor.append(data.newContent)

            let notebookTemplate = handlebars.compile($("#notebooksName-list-tpl-for-delete")
              .html()
              .replace(/<%/g, '{{')
              .replace(/%>/g, '}}'))
            $('#notebooksName-list').html(template(data.notebookName))

            let noteTemplate = handlebars.compile($("#notes-list-tpl")
              .html()
              .replace(/<%/g, '{{')
              .replace(/%>/g, '}}'))
            $('#notes-list').html(template(data.notebookId))

          },
          error   : function (error) {
            console.log(error)
          }
        })
      }

    }
  })

}