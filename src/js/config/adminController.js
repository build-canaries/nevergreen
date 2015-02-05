var $ = require('jquery')

module.exports = {

    getProjects: function (cctrayUrl, username, password, successHandler, showSpinner, hideSpinner, errorHandler) {
        $.ajax({
            type: 'GET',
            url: '/api/projects',
            timeout: 15000,
            data: {
                url: cctrayUrl,
                serverType: localStorage.getItem('serverType')
            },
            dataType: "json",
            beforeSend: function () {
                showSpinner()
            },
            complete: function () {
                hideSpinner()
            },
            success: function (response) {
                localStorage.serverType = response.server
                successHandler(response.projects)
            },
            error: function (xhr, ajaxOptions, thrownError) {
                errorHandler(xhr.status, thrownError)
            }
        })
    }

}