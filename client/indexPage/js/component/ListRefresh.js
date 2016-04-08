'use strict'
/**
 * @author Knight Young
 */
let handlebars = require('../../../../node_modules/handlebars/dist/handlebars.min.js')

module.exports = {
  /**
   * 刷新笔记本列表
   * @param data
   */
  notebook: (data)=> {

    let notebookTpl = handlebars.compile($("#notebookNames-list-tpl")
      .html()
      .replace(/<%/g, '{{')
      .replace(/%>/g, '}}'))
    $('#notebookNames-list').html(notebookTpl(data))

    // console.log('notebookTpl:')
    // console.log(notebookTpl(data))

  },

  /**
   * 刷新文稿列表
   * @param data
   */
  note: (data)=> {

    let noteTpl = handlebars.compile($("#notes-list-tpl")
      .html()
      .replace(/<%/g, '{{')
      .replace(/%>/g, '}}'))
    $('#notes-list').html(noteTpl(data))

    // console.log('noteTpl:')
    // console.log(noteTpl(data))

  },

  /**
   * 刷新文稿记录列表
   * @param data
   */
  record: (data)=> {

    let recordTpl = handlebars.compile($("#recordsName-list-tpl")
      .html()
      .replace(/<%/g, '{{')
      .replace(/%>/g, '}}'))
    $('#recordsName-list').html(recordTpl(data))

    // console.log('recordTpl:')
    // console.log(recordTpl(data))

  }

}