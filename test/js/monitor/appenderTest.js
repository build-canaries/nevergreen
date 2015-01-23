var $ = require('jquery')
var monitorAppender = require('../../../src/js/monitor/appender')

describe('Showing success message', function () {
    it('image', function () {
        var config = {
            load: function () {
                return {successText: 'some success text', successImageUrl: 'some-success-url'}
            }
        }
        var appender = monitorAppender(config, [])
        $('body').empty()
        $('body').append('<div id="projects"/>')

        appender.addProjects()

        expect($('#success-image')).toBeInDOM()
        expect($('#success-text')).not.toBeInDOM()
    })

    it('text', function () {
        var config = {
            load: function () {
                return {successText: 'some success text'}
            }
        }
        var appender = monitorAppender(config, [])
        $('body').empty()
        $('body').append('<div id="projects"/>')

        appender.addProjects()

        expect($('#success-text')).toBeInDOM()
        expect($('#success-image')).not.toBeInDOM()
    })
})
