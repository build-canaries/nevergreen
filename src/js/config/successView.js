var $ = require('jquery')

module.exports = function (successRepository) {
    var view = {
        init: function () {
            load(successRepository)
            this.addClickHandlers()
        },

        addClickHandlers: function () {
            $('#save-success-configuration').click(function (e) {
                e.preventDefault();
                saveSuccessConfiguration(successRepository)
            })
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

function saveSuccessConfiguration(storageRepository) {
    saveSuccessText(storageRepository)
    saveAndShowSuccessImage(storageRepository)
}

function saveSuccessText(storageRepository) {
    storageRepository.saveSuccessText($('#success-text').val())
}

function saveAndShowSuccessImage(storageRepository) {
    var imageUrl = $('#success-image-url').val()
    storageRepository.saveSuccessImageUrl(imageUrl)
    showSuccessImage(imageUrl)
}

function showSuccessImage(imageUrl) {
    var successImage = $('#success-image');
    successImage.attr('src', imageUrl)
    successImage.removeClass('hidden')
}

function loadSuccessImage(storageRepository) {
    if (storageRepository.hasSuccessImageUrl()) {
        var imageUrl = storageRepository.getSuccessImageUrl()
        $('#success-image-url').val(imageUrl)
        showSuccessImage(imageUrl)
    }
}
