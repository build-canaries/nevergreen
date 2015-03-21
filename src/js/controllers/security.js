var $ = require('jquery')

module.exports = {
    encryptPassword: function (password, successCallback, errorCallback) {
        $.ajax({
            type: 'POST',
            url: '/api/encrypt',
            data: {
                password: password
            },
            dataType: 'json',
            timeout: 15000,
            success: successCallback,
            error: errorCallback
        })
    }
}