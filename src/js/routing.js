var currentPath = window.location.pathname

if (currentPath === '/config') {
    console.log('Routing: Config page')
    require('./config/blastoff')()
} else {
    console.log('Routing: Monitor page')
    require('./monitor/blastoff')()
}