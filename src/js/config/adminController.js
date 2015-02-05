var $ = require('jquery')

module.exports = function (trackingRepository) {
    return {
        getProjects: function (cctrayUrl, username, password, successHandler, showSpinner, hideSpinner, errorHandler) {
            var payload = buildPayload(cctrayUrl, username, password, trackingRepository)
            $.ajax({
                type: 'GET',
                url: '/api/projects',
                timeout: 15000,
                data: payload,
                dataType: "json",
                beforeSend: function () {
                    showSpinner()
                },
                complete: function () {
                    hideSpinner()
                },
                success: function (response) {
                    localStorage.serverType = response.server
                    successHandler(response.projects, response.password)
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    errorHandler(xhr.status, thrownError)
                }
            })
        }
    }
}

function buildPayload(cctrayUrl, username, password, storageRepository) {
    var defaults = {
        url: cctrayUrl,
        serverType: storageRepository.getServerType()
    }
    var options = function () {
        if (username && password) {
            return {
                username: username,
                password: password
            }
        }
    }
    return $.extend({}, defaults, options())
}