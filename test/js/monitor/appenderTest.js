var $ = require('jquery')
var appender = require('../../../src/js/monitor/appender')

describe('Showing success message', function () {

    var testInstance
    var $body = $('body')

    var successRepositoryMock = {
        saveSuccessMessages: function () {
        },
        getSuccessMessages: function () {
        }
    }

    var successMessageMock = {
        ifImage: function () {
        }
    }

    beforeEach(function () {
        testInstance = appender(successRepositoryMock, successMessageMock)

        $body.empty()
        $body.append('<div id="projects"/>')
    })

    it('shows success image', function () {
        spyOn(successRepositoryMock, 'getSuccessMessages').and.returnValue(['http://some-success-url'])
        spyOn(successMessageMock, 'ifImage').and.callFake(function (message, trueCallback) {
            trueCallback(message)
        })

        testInstance.addProjects([])

        expect($('#success-image')).toBeInDOM()
        expect($('#success-text')).not.toBeInDOM()
    })

    it('text', function () {
        spyOn(successRepositoryMock, 'getSuccessMessages').and.returnValue(['success-message'])
        spyOn(successMessageMock, 'ifImage').and.callFake(function (message, trueCallback, falseCallback) {
            falseCallback(message)
        })

        testInstance.addProjects([])

        expect($('#success-text')).toBeInDOM()
        expect($('#success-image')).not.toBeInDOM()
    })
})
