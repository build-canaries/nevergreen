var location = window.location.pathname

if (location === "/config") {
    console.log('Routing: Config page')
    require('./config/blastoff')()
} else {
    console.log('Routing: Monitor page')
    require('./monitor/blastoff')()
}