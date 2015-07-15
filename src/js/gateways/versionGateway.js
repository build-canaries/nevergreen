var gateway = require('../gateways/gateway')

module.exports = {
    getVersion: function () {
        return gateway.get('/api/version')
    }
}
