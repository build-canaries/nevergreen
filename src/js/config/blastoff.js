var AdminView = require('./adminView')
var AdminController = require('./adminController')
var Config = require('./config')

new AdminView(new AdminController()).init(new Config())