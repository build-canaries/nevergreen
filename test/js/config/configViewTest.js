var $ = require('jquery')
var view = require('../../../src/js/config/configView')

describe('config view', function () {

    var $body = $('body')

    beforeEach(function () {
        $body.empty()
    })

    describe('spinner', function () {
        it('is shown', function () {
            $body.append(
                '<div id="loading-modal" />' +
                '<div id="spinner" style="display: none" />')

            view.showSpinner()

            expect($('#spinner')).toBeVisible()
            expect($('#loading-modal')).toHaveClass('loading')
        })

        it('is hidden', function () {
            $body.append(
                '<div id="loading-modal"/>' +
                '<div id="spinner"/>')

            view.hideSpinner()

            expect($('#spinner')).not.toBeVisible()
            expect($('#loading-modal')).not.toHaveClass('loading')
        })
    })

    it('handles errors', function () {
        $body.append('<div id="projects"/>')

        view.errorHandler('code', 'reason')

        expect($('#projects')).toContainHtml('reason')
    })

})
