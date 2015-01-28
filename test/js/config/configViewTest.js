var $ = require('jquery')
var view = require('../../../src/js/config/configView')

describe('config view', function () {

    var $body = $('body')

    beforeEach(function () {
        $body.empty()
    })

    describe('spinner', function () {
        it('is shown', function () {
            $body.append('<div id="projects"><ul><li>some project</li></ul></div>' +
            '<div id="spinner" style="display: none" />')

            view.showSpinner()

            expect($('#spinner')).toBeVisible()
            expect($('#projects')).toBeEmpty()
        })

        it('is hidden', function () {
            $body.append('<div id="spinner"/>')

            view.hideSpinner()

            expect($('#spinner')).not.toBeVisible()
        })
    })

    it('handles errors', function () {
        $body.append('<div id="projects"/>')

        view.errorHandler('code', 'reason')

        expect($('#projects')).toContainHtml('reason')
    })

})
