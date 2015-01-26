var $ = require('jquery')
var storageRepository = {
    hasSuccessImageUrl: function () {
    },
    getSuccessImageUrl: function () {
    },
    getSuccessText: function () {
    }
}
var projects = [];
var appender = require('../../../src/js/monitor/appender')(storageRepository, projects)

describe('Showing success message', function () {
    it('shows success image', function () {
        spyOn(storageRepository, 'hasSuccessImageUrl').and.returnValue(true)
        spyOn(storageRepository, 'getSuccessImageUrl').and.returnValue('some-success-url')
        $('body').empty()
        $('body').append('<div id="projects"/>')

        appender.addProjects()

        expect($('#success-image')).toBeInDOM()
        expect($('#success-text')).not.toBeInDOM()
    })

    it('text', function () {
        $('body').empty()
        $('body').append('<div id="projects"/>')

        appender.addProjects()

        expect($('#success-text')).toBeInDOM()
        expect($('#success-image')).not.toBeInDOM()
    })
})
