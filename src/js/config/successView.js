var $ = require('jquery')

module.exports = function (successRepository) {
    var view = {
        init: function () {
            load(successRepository)
            this.addEventHandlers()
        },

        addEventHandlers: function () {
            $('#success-text').blur(function () {
                saveSuccessText(successRepository)
            })
            $('#success-image-url').blur(function () {
                saveAndShowSuccessImage(successRepository)
            })
        }

    }
    return view
}

function load(storageRepository) {
    $('#success-text').val(storageRepository.getSuccessText())
    loadSuccessImage(storageRepository);
}

function saveSuccessText(storageRepository) {
    storageRepository.saveSuccessText($('#success-text').val())
}

function saveAndShowSuccessImage(storageRepository) {
    var imageUrl = $('#success-image-url').val()
    storageRepository.saveSuccessImageUrl(imageUrl)
    showSuccessImage(imageUrl, storageRepository)
}

function showSuccessImage(imageUrl, storageRepository) {
    var successImage = $('#success-image')
    successImage.attr('src', imageUrl)
    storageRepository.hasSuccessImageUrl() ? successImage.removeClass('hidden') : successImage.addClass('hidden')
}

function loadSuccessImage(storageRepository) {
    if (storageRepository.hasSuccessImageUrl()) {
        var imageUrl = storageRepository.getSuccessImageUrl()
        $('#success-image-url').val(imageUrl)
        showSuccessImage(imageUrl, storageRepository)
    }
}
