var $ = require('jquery')
var successView = require('../../../src/js/config/successView')

describe('success view', function () {

    var view
    var $body = $('body')

    var successRepositoryMock = {
        saveSuccessMessages: function () {
        },
        getSuccessMessages: function () {
        }
    }

    beforeEach(function () {
        view = successView(successRepositoryMock)

        $body.empty()
    })

    describe('success messages', function () {
        it('loads', function () {
            $body.append(
                '<div id="success-inputs">' +
                '</div>' +
                '<button id="success-add"/>')

            spyOn(successRepositoryMock, 'getSuccessMessages').and.returnValue(['any old value'])

            view.init()

            expect($('#success-message-0').val()).toBe('any old value')
        })

        it('saves', function () {
            $body.append(
                '<div id="success-inputs">' +
                '<input id="success-message-0"/>' +
                '</div>' +
                '<button id="success-add"/>')

            spyOn(successRepositoryMock, 'saveSuccessMessages')
            view.addEventHandlers()

            var $success = $('#success-message-0')
            $success.val('expected')

            $success.blur()

            expect(successRepositoryMock.saveSuccessMessages).toHaveBeenCalledWith(['expected'])
        })
    })

})
