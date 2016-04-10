'use strict'
/**
 * @author Knight Young
 */
let textEditor = require('./../textEditor')
let Refresh    = require('./ListRefresh')

module.exports = function() {
  
  /**********操作笔记本的接口**********/
  
  //新建笔记本按钮
  $('#addNoteBook').on('click', ()=> {
    // console.log('addNoteBook!!!')
    $('#add-notebook-prompt').modal({
      relatedTarget: this,
      onConfirm    : function(e) {
        // console.log('inner :' + e.data)

        $.ajax({
          url     : '/index/addNoteBook',
          data    : {
            notebookName: e.data || ''
          },
          type    : 'post',
          dataType: 'json',
          success : function(data) {
            if(data.repeat) {//输入的名字重复了

              //弹出提示信息
              $('#message-alert .am-modal-hd').text('您输入的名字已存在')
              $('#message-alert').modal('open')

            } else {

              //刷新当前标题
              $('div.am-topbar-left button').text(data.defaultHeader)

              //刷新列表
              Refresh.notebook(data)
              Refresh.note(data)
              Refresh.record(data)

            }
          },
          error   : function(error) { console.log(error) }
        })

      }
    })

  })
  
  //删除笔记本按钮
  $('#deleteNoteBook').on('click', ()=> {
    $('#notebookNames-list').data('store', 'delete')
    $('#notebookNames-list button').text('删除').addClass('am-btn-danger').removeClass('hidden am-btn-warning')
  })
  
  //修改笔记本按钮
  $('#renameNoteBook').on('click', ()=> {
    $('#notebookNames-list').data('store', 'rename')
    $('#notebookNames-list button').text('重命名').addClass('am-btn-warning').removeClass('hidden am-btn-danger')
  })
  
  //收起侧边栏清除掉列表button的样式
  $('#notebooks-list').on('close.offcanvas.amui', ()=> {
    $('#notebookNames-list button').text('').addClass('hidden')
  })
  
  //列表中的删除和重命名功能
  $('#notebookNames-list').on('click', (e)=> {

    if(e.target.tagName === 'BUTTON') {

      let $thisId = $(e.target)[0].dataset.notebookid
      // console.log('this id is ->' + $thisId)

      let $store = $('#notebookNames-list').data('store')
      // console.log('this target is ->' + e.target.tagName)

      if($store === 'delete') {
        // console.log('delete inner :' + $thisId)
        $.ajax({
          url     : '/index/deleteNoteBook',
          data    : {
            notebookId: $thisId //当前的notebookId
          },
          type    : 'post',
          dataType: 'json',
          success : function(data) {

            //刷新当前标题
            $('div.am-topbar-left button').text(data.defaultHeader)

            //清除编辑器内容
            textEditor.clear()

            //插入新内容
            textEditor.append(data.defaultContent)

            //刷新列表
            Refresh.notebook(data)
            Refresh.note(data)
            Refresh.record(data)

          },
          error   : function(error) { console.log(error) }
        })

      } else if($store === 'rename') {

        let newNotebookName = window.prompt('为你的笔记本起个新名字')

        if(! newNotebookName) {
          //弹出提示信息
          $('#message-alert .am-modal-hd').text('笔记本名不能为空')
          $('#message-alert').modal('open')
          return
        }
        // (function(notebookId) {
        //   console.log('rename outer :' + notebookId)
        //
        //   $('#rename-notebook-prompt').modal({
        //     relatedTarget: this,
        //     onConfirm    : (e)=> {
        //       console.log('rename inner :' + notebookId)
        let data = {
          notebookId     : $thisId,
          newNotebookName: newNotebookName
        }

        // console.log(data)

        $.ajax({
          url     : '/index/renameNoteBook',
          data    : data,
          type    : 'post',
          dataType: 'json',
          success : function(data) {

            if(data.repeat) {//输入的名字重复了

              //刷新当前标题
              $('div.am-topbar-left button').text(data.defaultHeader)

              //弹出提示信息
              $('#message-alert .am-modal-hd').text('该笔记本已经存在')
              $('#message-alert').modal('open')

            } else {

              //清除编辑器内容
              textEditor.clear()

              //插入新内容
              textEditor.append(data.defaultContent)

              //刷新列表
              Refresh.notebook(data)
              Refresh.note(data)
              Refresh.record(data)
            }

          },
          error   : function(error) { console.log(error) }
        })
        //
        //     }
        //   })
        // })($thisId)
      }
    } else if(e.target.tagName === 'A' || 'I') {//切换笔记本

      let $thisId = $(e.target)[0].children[1].dataset.notebookid
      // console.log($thisId)
      //     console.log('this target is ->' + e.target.tagName)

      $.ajax({
        url     : '/index/switchNotebook',
        data    : {
          notebookId: $thisId //当前的notebookId
        },
        type    : 'post',
        dataType: 'json',
        success : function(data) {

          //收起边栏
          $('#notebooks-list').offCanvas('close')

          //清除编辑器内容
          textEditor.clear()

          //插入新内容
          textEditor.append(data.defaultContent)

          //刷新当前标题
          $('div.am-topbar-left button').text(data.defaultHeader)
          
          //刷新列表
          Refresh.note(data)
          Refresh.record(data)

        },
        error   : function(error) { console.log(error) }
      })

    }
  })

}
