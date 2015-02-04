var $ = require('jquery')
var successView = require('../../../src/js/config/successView')

describe('success view', function () {

    var view
    var $body = $('body')

    var successRepositoryMock = {
        saveSuccessMessages: function () {
        },
        getSuccessMessages: function () {
        },
        hasSuccessMessages: function () {
        }
    }

    beforeEach(function () {
        view = successView(successRepositoryMock)

        $body.empty()
    })

    describe('success messages', function () {
        it('loads', function () {
            $body.append(
                '<div id="success-messages">' +
                '</div>' +
                '<button id="success-add"/>')

            spyOn(successRepositoryMock, 'hasSuccessMessages').and.returnValue(true)
            spyOn(successRepositoryMock, 'getSuccessMessages').and.returnValue(['a', 'b', 'c'])

            view.init()

            expect($('#success-message-0').val()).toBe('a')
            expect($('#success-message-1').val()).toBe('b')
            expect($('#success-message-2').val()).toBe('c')
        })

        it('saves', function () {
            $body.append(
                '<div id="success-messages">' +
                '<input id="success-message-0" value="a"/>' +
                '<input id="success-message-1" value="b"/>' +
                '<input id="success-message-2" value="c"/>' +
                '</div>' +
                '<button id="success-add"/>')

            spyOn(successRepositoryMock, 'saveSuccessMessages')
            view.addEventHandlers()

            $('#success-message-0').blur()

            expect(successRepositoryMock.saveSuccessMessages).toHaveBeenCalledWith(['a', 'b', 'c'])
        })

        it('adds default', function () {
            $body.append(
                '<div id="success-messages">' +
                '</div>' +
                '<button id="success-add"/>')

            spyOn(successRepositoryMock, 'saveSuccessMessages')
            spyOn(successRepositoryMock, 'hasSuccessMessages').and.returnValue(false)

            view.init()

            expect($('#success-message-0').val()).toBe('=(^.^)=')
            expect(successRepositoryMock.saveSuccessMessages).toHaveBeenCalledWith(['=(^.^)='])
        })
    })

})
