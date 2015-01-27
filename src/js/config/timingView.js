var $ = require('jquery')
var pollingTimeId = '#polling-time';

module.exports = function (storageRepository) {
    var view = {
        init: function () {
            load(storageRepository)
            this.addClickHandlers()
        },

        addClickHandlers: function () {
            $('#save-polling-time').click(function (e) {
                savePollingTime(storageRepository)
            })
            $('#polling-time').blur(function () {
                savePollingTime(storageRepository)
            })
        }
    }
    return view
}

function load(storageRepository) {
    $(pollingTimeId).val(storageRepository.getPollingTime())
}

function savePollingTime(storageRepository) {
    storageRepository.savePollingTime($(pollingTimeId).val())
}