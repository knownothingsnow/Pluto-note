'use strict'
/**
 * @author Knight Young
 */
let Refresh = require('./ListRefresh')

/**
 * '文稿'下拉菜单的功能
 */
module.exports = function(Editor) {

  // 切换笔记
  $('#notes-list').on('click', function(e) {

    $.ajax({
      url     : '/index/switchNote',
      data    : {
        //当前的noteId
        noteId: $(e.target).parent().data('noteid')
      },
      type    : 'post',
      dataType: 'json',
      success : function(data) {
        //关闭下拉菜单
        $('#notes-list').parent().dropdown('close')

        //刷新当前标题
        $('div.am-topbar-left button').text(data.defaultHeader)

        //刷新列表
        Refresh.record(data)

        //清除编辑器内容
        Editor.clear()

        //插入新内容
        Editor.append(data.defaultContent)

      },
      error   : function(error) {
        console.log(error.name + ": " + error.message);
      }
    })

  })

  //添加笔记
  $('#addNote').on('click', ()=> {
    $('#add-note-prompt').modal({
      relatedTarget: this,
      onConfirm    : function(e) {
        
        $.ajax({
          url     : '/index/addNote',
          data    : {
            newHeader: e.data || ''
          },
          type    : 'post',
          dataType: 'json',
          success : function(data) {

            //刷新列表
            Refresh.note(data)
            Refresh.record(data)

            //清除编辑器内容
            Editor.clear()

            //插入新内容
            Editor.append(data.defaultContent)

            //弹出提示信息
            $('#message-alert .am-modal-hd').text('新建文稿成功')
            $('#message-alert').modal('open')

          },
          error   : function(error) {
            console.log(error.name + ": " + error.message);
          }
        })

      }
    })
  })

  //删除笔记
  $('#deleteNote').on('click', function() {

    $.ajax({
      url     : '/index/deleteNote',
      type    : 'post',
      dataType: 'json',
      success : function(data) {

        //刷新当前标题
        $('div.am-topbar-left button').text(data.defaultHeader)

        //刷新列表
        Refresh.note(data)
        Refresh.record(data)

        //清除编辑器内容
        Editor.clear()

        //插入新内容
        Editor.append(data.defaultContent)

        //弹出提示信息
        $('#message-alert .am-modal-hd').text('删除文稿成功')
        $('#message-alert').modal('open')

      },
      error   : function(error) {
        console.log(error.name + ": " + error.message);
      }
    })

  })

  //重命名笔记
  $('#renameNote').on('click', function() {
    $('#rename-note-prompt>.am-modal-dialog').children('.am-modal-hd').text('重新起一个名字吧')
    $('#rename-note-prompt').modal({
      relatedTarget: this,
      onConfirm    : function(e) {

        $.ajax({
          url     : '/index/renameNote',
          data    : {
            newHeader: e.data || ''
          },
          type    : 'post',
          dataType: 'json',
          success : function(data) {

            //刷新当前标题
            $('div.am-topbar-left button').text(data.defaultHeader)

            //刷新列表
            Refresh.note(data)

            //弹出提示信息
            $('#message-alert .am-modal-hd').text('重命名文稿成功')
            $('#message-alert').modal('open')

          },
          error   : function(error) {
            console.log(error.name + ": " + error.message);
          }
        })

      }
    })
  })
  
  //添加文稿记录
  $('#addRecord').on('click', ()=> {

    $.ajax({
      url     : '/index/addRecord',
      data    : {
        content: editor.$txt.html(),
        type   : 0
      },
      type    : 'post',
      dataType: 'json',
      success : function(data) {

        //刷新列表
        Refresh.record(data)

        //清除编辑器内容
        Editor.clear()

        //插入新内容
        Editor.append(data.defaultContent)

        //弹出提示信息
        $('#message-alert .am-modal-hd').text('你留下了一条新历史存档')
        $('#message-alert').modal('open')

      },
      error   : function(error) {
        console.log(error.name + ": " + error.message);
      }
    })

  })
  
  // let saveRecord = function() {
  //
  //   $.ajax({
  //     url     : '/index/saveRecord',
  //     data    : {
  //       content: editor.$txt.html()
  //     },
  //     type    : 'post',
  //     dataType: 'json',
  //     success : function(data) {
  //       console.log(data)
  //       //弹出提示信息
  //       $('h1').popover('open')
  //       setTimeout(()=> { $('h1').popover('close') }, 1000)
  //     },
  //     error   : function(error) {  console.log(error.name + ": " + error.message); }
  //   })
  //
  //   // timerId=resetTimer(timerId)
  //
  // }

  // function resetTimer(timerId) {
  //
  //   clearInterval(timerId)
  //   return setInterval(saveRecord(), 3000)
  //
  // }
  let timer
  //手动保存笔记
  $('#saveRecord').on('click', function() {
    $.ajax({
      url     : '/index/saveRecord',
      data    : {
        content: editor.$txt.html()
      },
      type    : 'post',
      dataType: 'json',
      success : function(data) {
        console.log(data)
        //弹出提示信息
        $('h1').popover('open')
        // setTimeout(()=> { $('h1').popover('close') }, 1000)
        resetTimer()
      },
      error   : function(error) { console.log(error.name + ": " + error.message); }
    })
  })

  //自动保存笔记
  $('h1').off()

  //启动计时器
  let initialTimer = ()=> {
    timer = setInterval(function() {
      $.ajax({
        url     : '/index/saveRecord',
        data    : {
          content: editor.$txt.html()
        },
        type    : 'post',
        dataType: 'json',
        success : function(data) {
          console.log(data)
          //弹出提示信息
          $('h1').popover('open')
          setTimeout(()=> { $('h1').popover('close') }, 1000)
        },
        error   : function(error) { console.log(error.name + ": " + error.message); }
      })
    }, 30000)
  }

  //重置计时器
  let resetTimer = ()=> {
    clearInterval(timer)
    initialTimer()
  }

  initialTimer()

}
