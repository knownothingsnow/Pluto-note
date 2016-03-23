'use strict'
/**
 * @author Knight Young
 */

var Parser = require('hyperdown');
var parser = new Parser();
parser.makeHtml('#mdtext#')

module.exports=parser