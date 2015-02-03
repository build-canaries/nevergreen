var $ = require('jquery')

module.exports = function (successRepository) {
    var view = {
        init: function () {
            load(successRepository)
            this.addEventHandlers()
        },

        addEventHandlers: function () {
            $('#success-add').click(function (e) {
                e.preventDefault()
                appendSuccessInput($('#success-inputs').find('input').length, "")
            })

            var $success = $('#success-inputs')

            $success.on('click', '.success-remove', function (e) {
                e.preventDefault()
                $(this).parent('div').remove()
                successRepository.saveSuccessMessages(getSuccessMessages())
            })
            $success.on('blur', 'input', function () {
                successRepository.saveSuccessMessages(getSuccessMessages())
            })
        }
    }
    return view
}

function load(successRepository) {
    var messages = successRepository.getSuccessMessages()
    for (var i = 0; i < messages.length; i++) {
        appendSuccessInput(i, messages[i])
    }
}

function appendSuccessInput(i, value) {
    var removeLink = ''
    if (i !== 0) {
        removeLink = '<a href="#" class="success-remove">remove</a>'
    }

    $('#success-inputs').append(
        '<div>' +
        '<label for="success-message-"' + i + '>Message</label>' +
        '<input id="success-message-' + i + '" class="success-message-input" type="text" name="success-message" value="' + value + '">' +
        removeLink +
        '</div>')
}

function getSuccessMessages() {
    return $('#success-inputs').find('input').map(function (index, element) {
        return $(element).val()
    }).toArray()
}
