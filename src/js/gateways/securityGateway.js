var gateway = require('./gateway')

module.exports = {
    encryptPassword: function (password) {
        return gateway.post('/api/encrypt', {password: password})
    }
}
