var $ = require('jquery')
var config = {
    load: function () {
        return {successText: 'some success text', successImageUrl: 'some-success-url'}
    }
}
var projects = [];
var appender = require('../../../src/js/monitor/appender')(config, projects)

describe('Showing success message', function () {
    it('shows success image', function () {
        $('body').empty()
        $('body').append('<div id="projects"/>')

        appender.addProjects()

        var successImageUrl = $('#success-image').attr('src');
        expect(successImageUrl).toBe('some-success-url')
        expect($('#success-text')).not.toBeInDOM()
    })
})
