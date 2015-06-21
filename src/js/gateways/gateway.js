var $ = require('jquery')

module.exports = {
    post: function (url, data) {
        return $.ajax({
            type: 'POST',
            url: url,
            timeout: 15000,
            data: JSON.stringify(data),
            headers: {
                Accept: 'application/json; charset=utf-8',
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).promise()
    }
}
