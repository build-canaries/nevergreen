var $ = require('jquery')
var successView = require('../../../src/js/config/successView')

describe('success view', function () {

    var view
    var $body = $('body')

    var successRepositoryMock = {
        getSuccessText: function () {
        },
        getSuccessImageUrl: function () {
        },
        hasSuccessImageUrl: function () {
        },
        saveSuccessText: function () {
        },
        saveSuccessImageUrl: function () {
        }
    }

    beforeEach(function () {
        view = successView(successRepositoryMock)

        $body.empty()
        $body.append(
            '<input id="success-text" type="text" name="success-text"/>' +
            '<input id="success-image-url" type="text" name="success-image"/>' +
            '<input id="save-success-configuration" class="button" type="button">' +
            '<img id="success-image" src="" class="hidden"/>')
    })

    describe('success text', function () {
        it('saves', function () {
            view.addEventHandlers()
            $('#success-text').val('expected')
            spyOn(successRepositoryMock, 'saveSuccessText')

            $('#success-text').blur()

            expect(successRepositoryMock.saveSuccessText).toHaveBeenCalledWith('expected')
        })

        it('loads', function () {
            spyOn(successRepositoryMock, 'getSuccessText').and.returnValue('any old value')
            var textInput = $('#success-text')

            view.init()

            expect(textInput.val()).toBe('any old value')
        })
    })

    describe('success image', function () {
        it('loads', function () {
            spyOn(successRepositoryMock, 'getSuccessImageUrl').and.returnValue('any old value')
            spyOn(successRepositoryMock, 'hasSuccessImageUrl').and.returnValue(true)

            view.init()

            var $success = $('#success-image');
            expect($('#success-image-url').val()).toBe('any old value')
            expect($success.attr('src')).toBe('any old value')
            expect($success).not.toHaveClass('hidden')
        })

        it('saves and shows image on the page', function () {
            view.init()
            $('#success-image-url').val('expected-image-url')
            spyOn(successRepositoryMock, 'saveSuccessImageUrl')
            spyOn(successRepositoryMock, 'hasSuccessImageUrl').and.returnValue(true)

            $('#success-image-url').blur()

            var $success = $('#success-image');
            expect($success.attr('src')).toBe('expected-image-url')
            expect($success).not.toHaveClass('hidden')
            expect(successRepositoryMock.saveSuccessImageUrl).toHaveBeenCalledWith('expected-image-url')
        })

        it('hides image if url is empty', function () {
            view.init()
            $('#success-image-url').val('')
            spyOn(successRepositoryMock, 'saveSuccessImageUrl')
            spyOn(successRepositoryMock, 'hasSuccessImageUrl').and.returnValue(false)

            $('#success-image-url').blur()

            var $success = $('#success-image');
            expect($success.attr('src')).toBe('')
            expect($success).toHaveClass('hidden')
            expect(successRepositoryMock.saveSuccessImageUrl).toHaveBeenCalledWith('')
        })
    })

})
