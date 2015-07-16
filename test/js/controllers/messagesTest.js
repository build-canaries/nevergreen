jest.dontMock('../../../src/js/controllers/messages')

describe('messages controller', function () {

    var successRepositoryMock, messages

    beforeEach(function () {
        successRepositoryMock = require('../../../src/js/storage/successRepository')
        messages = require('../../../src/js/controllers/messages')
    })

    describe('is url', function () {
        it('true if value starts with http', function () {
            expect(messages.isUrl('http')).toBeTruthy()
        })

        it('false if value does not start with http', function () {
            expect(messages.isUrl('abc')).toBeFalsy()
        })

        describe('false if value is not a string', function () {
            it('number', function () {
                expect(messages.isUrl(123)).toBeFalsy()
            })

            it('object', function () {
                expect(messages.isUrl({})).toBeFalsy()
            })

            it('array', function () {
                expect(messages.isUrl([])).toBeFalsy()
            })

            it('function', function () {
                expect(messages.isUrl(function () {
                })).toBeFalsy()
            })
        })
    })

    describe('random message', function () {
        it('one message saved', function () {
            successRepositoryMock.getSuccessMessages.mockReturnValue(['message'])
            expect(messages.randomMessage()).toEqual('message')
        })

        it('multiple message saved', function () {
            successRepositoryMock.getSuccessMessages.mockReturnValue(['a', 'b', 'c'])
            expect(['a', 'b', 'c']).toContain(messages.randomMessage())
        })

        it('no message saved', function () {
            successRepositoryMock.getSuccessMessages.mockReturnValue([])
            expect(messages.randomMessage()).toEqual('')
        })
    })
})
