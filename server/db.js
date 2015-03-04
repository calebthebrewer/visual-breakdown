/*
A reusable DB object
 */
var url = 'breakdown';
var db = require('mongojs').connect(url);

module.exports = db;