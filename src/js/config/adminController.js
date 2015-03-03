var $ = require('jquery')

module.exports = function (trackingRepository, configView) {
    return {
        getProjects: function (successHandler) {
            var payload = buildPayload(trackingRepository)
            $.ajax({
                type: 'GET',
                url: '/api/projects',
                timeout: 15000,
                data: payload,
                dataType: "json",
                beforeSend: function () {
                    configView.showSpinner()
                },
                complete: function () {
                    configView.hideSpinner()
                },
                success: function (response) {
                    trackingRepository.saveServerType(response.server)
                    successHandler(response.projects)
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    configView.errorHandler(xhr.responseText)
                }
            })
        },

        encryptPasswordAndGetProjects: function (password, successHandler) {
            $.ajax({
                type: 'POST',
                url: '/api/encrypt',
                data: {
                    password: password
                },
                dataType: 'json',
                timeout: 15000,
                beforeSend: function () {
                    configView.showSpinner()
                },
                complete: function () {
                    configView.hideSpinner()
                },
                success: function (response) {
                    successHandler(response)
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    configView.errorHandler(xhr.status, thrownError)
                }
            })
        }
    }
}

function buildPayload(storageRepository) {
    var defaults = {
        url: storageRepository.getCctray(),
        serverType: storageRepository.getServerType()
    }
    var options = function () {
        var password = storageRepository.getPassword();
        var username = storageRepository.getUsername();
        if (username && password) {
            return {
                username: username,
                password: password
            }
        }
    }
    return $.extend({}, defaults, options())
}