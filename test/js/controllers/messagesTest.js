var successRepository = require('../../../src/js/storage/successRepository')
var messages = require('../../../src/js/controllers/messages')

describe('messages controller', function () {
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
            spyOn(successRepository, 'getSuccessMessages').and.returnValue(['message'])
            expect(messages.randomMessage()).toEqual('message')
        })

        it('multiple message saved', function () {
            spyOn(successRepository, 'getSuccessMessages').and.returnValue(['a', 'b', 'c'])
            expect(['a', 'b', 'c']).toContain(messages.randomMessage())
        })

        it('no message saved', function () {
            spyOn(successRepository, 'getSuccessMessages').and.returnValue([])
            expect(messages.randomMessage()).toEqual('')
        })
    })
})
