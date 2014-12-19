var currentPath = window.location.pathname

if (currentPath === '/config') {
    require('./config/blastoff')()
} else if (currentPath === '/') {
    require('./monitor/blastoff')()
} else {
    var $ = require('jquery')
    $('body').empty().append("There is no route for you here. Try /config or /")
}


