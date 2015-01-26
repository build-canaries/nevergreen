var $ = require('jquery')
var successRepositoryMock = {
    hasSuccessImageUrl: function () {
    },
    getSuccessImageUrl: function () {
    },
    getSuccessText: function () {
    }
}
var appender = require('../../../src/js/monitor/appender')(successRepositoryMock)

describe('Showing success message', function () {
    it('shows success image', function () {
        spyOn(successRepositoryMock, 'hasSuccessImageUrl').and.returnValue(true)
        spyOn(successRepositoryMock, 'getSuccessImageUrl').and.returnValue('some-success-url')
        $('body').empty()
        $('body').append('<div id="projects"/>')

        appender.addProjects([])

        expect($('#success-image')).toBeInDOM()
        expect($('#success-text')).not.toBeInDOM()
    })

    it('text', function () {
        $('body').empty()
        $('body').append('<div id="projects"/>')

        appender.addProjects([])

        expect($('#success-text')).toBeInDOM()
        expect($('#success-image')).not.toBeInDOM()
    })
})
