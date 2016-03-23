'use strict'
/**
 * @author Knight Young
 */
let handlebars = require('handlebars')

module.exports = function () {
  //为新建笔记本按钮绑定事件
  $('#addNoteBook').on('click', function () {
    $('#newNoteBookPrompt').modal({
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
            } else {//如果没重复,取得目前此用户的所有笔记本名
              var template = Handlebars.compile($("#notebooksName-list").html())
              console.log(data.data)
            }
          },
          error   : function (error) {
            alert("更新error:" + error)
            console.log(error)
          }
        })
      }
    })
  })
}