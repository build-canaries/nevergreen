var repository = require('../../../src/js/storage/repository')
var messages = require('../../../src/js/services/messages')
var successRepository = require('../../../src/js/storage/successRepository')

describe('success repository', function () {

    describe('saving to local storage', function () {
        beforeEach(function () {
            spyOn(repository, 'save')
        })

        it('saves all success messages', function () {
            successRepository.saveSuccessMessages([
                messages.newMessage('a'),
                messages.newMessage('b'),
                messages.newMessage('c')
            ])
            expect(repository.save).toHaveBeenCalledWith('successMessages', ['a', 'b', 'c'])
        })
    })

    describe('loading from local storage', function () {
        it('loads all success messages', function () {
            spyOn(repository, 'getArrayOr').and.returnValue(['a', 'b', 'c'])
            expect(successRepository.getSuccessMessages()).toEqual([
                messages.newMessage('a'),
                messages.newMessage('b'),
                messages.newMessage('c')
            ])
        })

        it('loads default success messages', function () {
            spyOn(repository, 'getArrayOr').and.returnValue([])
            expect(successRepository.getSuccessMessages()).toEqual([])
        })
    })

    describe('has', function () {
        beforeEach(function () {
            spyOn(repository, 'exists')
        })

        it('success messages', function () {
            successRepository.hasSuccessMessages()
            expect(repository.exists).toHaveBeenCalledWith('successMessages')
        })
    })

})
