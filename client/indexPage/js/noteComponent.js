'use strict'
/**
 * @author Knight Young
 */
let handlebars = require('../../../node_modules/handlebars/dist/handlebars.min')
let textEditor = require('./textEditor')

module.exports = function () {

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
            saveTime: Date.now(),
            header  : e.data || ''
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

  //手动保存笔记
  $('#saveNote').on('click', function () {

    $.ajax({
      url     : '/index/saveNote',
      data    : {
        saveTime: Date.now(),
        content : editor.$txt.html()
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

  //自动保存笔记
  $('h1').off()
  setInterval(()=> {
    $.ajax({
      url     : '/index/autoSaveNote',
      data    : {
        content: editor.$txt.html()
      },
      type    : 'post',
      dataType: 'json',
      success : function (data) {
        console.log(data)
        if (data) {
          $('h1').popover('open')
          setTimeout(()=> {
            $('h1').popover('close')
          }, 1000)
        }
      },
      error   : function (error) {
        console.log(error)
      }
    })
  }, 30000)

}
