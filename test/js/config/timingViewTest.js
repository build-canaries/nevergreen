var $ = require('jquery')
var timingView = require('../../../src/js/config/timingView')

describe('timing view', function () {
    var timingRepositoryMock = {
        getPollingTime: function () {
        },
        savePollingTime: function (time) {
        }
    }
    var view = timingView(timingRepositoryMock)

    describe('polling time', function () {
        beforeEach(function () {
            $('body').append('<form>' +
            '<input id="polling-time" type=number name=polling-time>' +
            '<input id="save-polling-time" type=button>' +
            '</form>')
        })

        it('saves', function () {
            view.addClickHandlers()
            $('#polling-time').val('6')
            spyOn(timingRepositoryMock, 'savePollingTime')

            $('#save-polling-time').click()

            expect(timingRepositoryMock.savePollingTime).toHaveBeenCalledWith('6')
        })

        it('loads', function () {
            spyOn(timingRepositoryMock, 'getPollingTime').and.returnValue(6)
            spyOn(view, 'addClickHandlers')
            var pollingTimeInput = $('#polling-time')

            view.init()

            expect(pollingTimeInput.val()).toBe('6')
            expect(view.addClickHandlers).toHaveBeenCalled()
        })
    })
})

