var $ = require('jquery')
var successView = require('../../../src/js/config/successView')

describe('success view', function () {

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

    var view

    beforeEach(function () {
        view = successView(successRepositoryMock)

        $('body').empty()
        $('body').append('<form>' +
        '<input id="success-text" type=text name=success-text/>' +
        '<input id="success-image-url" type=text name=success-image/>' +
        '<input id="save-success-configuration" class=button type=button>' +
        '</form> ' +
        '<img id="success-image" src="" class="hidden"/>')
    })

    describe('success text', function () {
        it('saves', function () {
            view.addClickHandlers()
            $('#success-text').val('expected')
            spyOn(successRepositoryMock, 'saveSuccessText')

            $('#save-success-configuration').click()

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
            var successImageUrl = $('#success-image-url')

            view.init()

            var imageSrc = $('#success-image').attr('src');
            expect(successImageUrl.val()).toBe('any old value')
            expect(imageSrc).toBe('any old value')
            expect($('#success-image')).not.toHaveClass('hidden')
        })

        it('saves and shows image on the page', function () {
            view.init()
            $('#success-image-url').val('expected-image-url')
            spyOn(successRepositoryMock, 'saveSuccessImageUrl')

            $('#save-success-configuration').click()

            var imageSrc = $('#success-image').attr('src');
            expect(imageSrc).toBe('expected-image-url')
            expect($('#success-image')).not.toHaveClass('hidden')
            expect(successRepositoryMock.saveSuccessImageUrl).toHaveBeenCalledWith('expected-image-url')
        })
    })

})
