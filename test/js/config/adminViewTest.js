var $ = require('jquery')
var adminView = require('../../../src/js/config/adminView')
var config = require('../../../src/js/config/config')

describe('view logic', function () {

    var adminController = { saveIncludedProjects: function(){},
                            getProjects: function(){},
                            saveSuccessText: function(){},
                            saveSuccessImageUrl: function(){},
                            saveSeenProjects: function(){}}

    beforeEach(function () {
        $('body').empty()
        $('body').append('<div id="projects"/>')
        localStorage.clear()
        view = adminView(adminController)
    })

    describe('autoloads projects', function () {
        it('does if cctray is available', function () {
            localStorage.setItem('cctray', 'some-url')
            spyOn(adminController, 'getProjects')

            view.init()

            expect(adminController.getProjects).toHaveBeenCalled()
        })

        it('does not if cctray is unavailable', function () {
            spyOn(adminController, 'getProjects')

            view.init(config)

            expect(adminController.getProjects).not.toHaveBeenCalled()
        })
    })

    describe('spinner', function () {
        it('is shown', function () {
            $('body').append('<div id="loading-modal"></div><div id="spinner" style="display: none"></div>')

            view.showSpinner()

            expect($('#spinner')).toBeVisible()
            expect($('#loading-modal')).toHaveClass('loading')
        })

        it('is hidden', function () {
            $('body').append('<div id="loading-modal"></div><div id="spinner"></div>')

            view.hideSpinner()

            expect($('#spinner')).not.toBeVisible()
            expect($('#loading-modal')).not.toHaveClass('loading')
        })
    })

    describe('cctray url', function() {
        it('saves on return key press', function() {
            $('body').append('<form>' +
            '<input id="cctray-url" type=text>' +
            '</form>')

            view.init()
            $('#cctray-url').val('   expected   ')

            // press return event
            var e = jQuery.Event('keypress'); e.which = 13; e.keyCode = 13;
            $('#cctray-url').trigger(e);

            expect(localStorage.cctray).toBe('expected')
        })
    })

    describe('fetch projects saves afterwards', function() {
        it('saves', function() {
            spyOn(adminController, 'saveIncludedProjects')

            view.appendProjects([])

            expect(adminController.saveIncludedProjects).toHaveBeenCalled()
        })
    })

    it('handles errors', function() {
        view.errorHandler('code', 'reason')

        expect($('#projects')).toContainHtml('reason')
    })

    describe('success', function () {

        describe('success text', function () {
            beforeEach(function () {
                $('body').append('<form>' +
                   '<input id="success-text" type=text name=success-text/>' +
                   '<input id="save-projects" class=button type=button>' +
                   '</form>')
            })

            it('saves', function () {
                spyOn(window.location, 'replace')
                view.init()
                $('#success-text').val('expected')
                spyOn(adminController, 'saveSuccessText')

                $('#save-projects').click()

                expect(adminController.saveSuccessText).toHaveBeenCalledWith('expected')
            })

            it('loads', function () {
                localStorage.setItem('successText', 'any old value')
                var textInput = $('#success-text')

                view.init()

                expect(textInput.val()).toBe('any old value')
            })
        })

        describe('success image', function () {
            beforeEach(function () {
                $('body').append('<form>' +
                   '<input id="success-image-url" type=text name=success-image/>' +
                   '<input id="save-success-image" class=button type=button>' +
                   '</form> ' +
                   '<img id="success-image" src="" class="hidden"/>')
            })

            it('loads', function () {
                localStorage.setItem('successImageUrl', 'any old value')
                var successImageUrl = $('#success-image-url')

                view.init()

                var imageSrc = $('#success-image').attr('src');
                expect(successImageUrl.val()).toBe('any old value')
                expect(imageSrc).toBe('any old value')
                expect($('#success-image')).not.toHaveClass('hidden')
            })

            it('saves and shows image on the page', function () {
                spyOn(window.location, 'replace')
                view.init()
                $('#success-image-url').val('expected-image-url')
                spyOn(adminController, 'saveSuccessImageUrl')

                $('#save-success-image').click()

                var imageSrc = $('#success-image').attr('src');
                expect(imageSrc).toBe('expected-image-url')
                expect($('#success-image')).not.toHaveClass('hidden')
                expect(adminController.saveSuccessImageUrl).toHaveBeenCalledWith('expected-image-url')
            })
        })
    })

})
