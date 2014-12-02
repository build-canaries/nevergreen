var $ = require('jquery')
var adminView = require('../../../src/js/config/adminView')
var config = require('../../../src/js/config/config')

describe('view logic', function () {

    var adminController = { saveIncludedProjects: function(){},
                            getProjects: function(){},
                            saveSuccessText: function(){},
                            saveSeenProjects: function(){}}

    beforeEach(function () {
        $('body').empty()
        $('body').append('<div id="projects"/>')
        localStorage.clear()
        view = adminView(adminController)
    })

    it('redirects on pressing the save button', function () {
        localStorage.setItem('cctray', 'some-url')
        localStorage.setItem('includedProjects', ['foo', 'bar'])
        spyOn(window.location, 'replace')
        $('body').append('<input id="save-projects"/>')
        $('body').append('<div id="projects"><ul>' +
            '<li class="included">proj-1</li>' +
            '<li class="included">proj-2</li>' +
            '<li>proj-3</li>' +
            '</ul></div>')

        view.init()
        $('#save-projects').click()

        expect(window.location.replace).toHaveBeenCalledWith('/')
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
        it('saves while trimming excess spaces', function () {
            $('body').append('<form>' +
            '<input id="cctray-url" type=text>' +
            '<input id="cctray-save" class=button type=button>' +
            '</form>')

            view.init()
            $('#cctray-url').val('   expected   ')
            $('#cctray-save').click()

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

})
