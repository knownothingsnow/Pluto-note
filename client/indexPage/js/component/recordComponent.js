'use strict'
/**
 * @author Knight Young
 */
let Refresh    = require('./ListRefresh')

/**
 * '历史记录'侧边栏的功能
 */
module.exports = function(Editor) {

  $('#recordsName-list').on('click', function(e) {
    switch(e.target.tagName) {

      case 'A' || 'I'://切换文稿记录
        $.ajax({
          url     : '/index/switchRecord',
          data    : {
            //当前的recordId
            recordId: $(e.target)[0].children[1].dataset.recordid
          },
          type    : 'post',
          dataType: 'json',
          success : function(data) {
            //收起边栏
            $('#records-list').offCanvas('close')

            //清除编辑器内容
            Editor.clear()

            //插入新内容
            Editor.append(data.defaultContent)
          },
          error   : function(error) {
            console.log(error.name + ": " + error.message);
          }
        })
        break

      case 'BUTTON'://删除文稿记录
        console.log($(e.target).data('recordid'))
        $.ajax({
          url     : '/index/deleteRecord',
          data    : {
            recordId: $(e.target).data('recordid') //当前的recordId
          },
          type    : 'post',
          dataType: 'json',
          success : function(data) {

            //清除编辑器内容
            Editor.clear()

            //插入新内容
            Editor.append(data.defaultContent)

            //刷新列表
            Refresh.record(data)

          },
          error   : function(error) { console.log(error) }
        })
        break

    }
  })
}