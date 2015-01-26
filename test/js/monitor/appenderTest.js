var $ = require('jquery')
var appender = require('../../../src/js/monitor/appender')

describe('Showing success message', function () {

    var testInstance
    var $body = $('body')

    var successRepositoryMock = {
        hasSuccessImageUrl: function () {
        },
        getSuccessImageUrl: function () {
        },
        getSuccessText: function () {
        }
    }

    beforeEach(function () {
        testInstance = appender(successRepositoryMock)

        $body.empty()
    })

    it('shows success image', function () {
        spyOn(successRepositoryMock, 'hasSuccessImageUrl').and.returnValue(true)
        spyOn(successRepositoryMock, 'getSuccessImageUrl').and.returnValue('some-success-url')
        $body.append('<div id="projects"/>')

        testInstance.addProjects([])

        expect($('#success-image')).toBeInDOM()
        expect($('#success-text')).not.toBeInDOM()
    })

    it('text', function () {
        $body.append('<div id="projects"/>')

        testInstance.addProjects([])

        expect($('#success-text')).toBeInDOM()
        expect($('#success-image')).not.toBeInDOM()
    })
})
