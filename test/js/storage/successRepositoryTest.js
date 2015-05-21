var repository = require('../../../src/js/storage/repository')
var successRepository = require('../../../src/js/storage/successRepository')

describe('success repository', function () {

    describe('saving to local storage', function () {
        beforeEach(function () {
            spyOn(repository, 'save')
        })

        it('saves all success messages', function () {
            successRepository.saveSuccessMessages(['a', 'b', 'c'])
            expect(repository.save).toHaveBeenCalledWith('successMessages', ['a', 'b', 'c'])
        })

        it('does not save empty success messages', function () {
            successRepository.saveSuccessMessages(['a', '', null, 'c'])
            expect(repository.save).toHaveBeenCalledWith('successMessages', ['a', 'c'])
        })
    })

    describe('loading from local storage', function () {
        it('loads all success messages', function () {
            spyOn(repository, 'getOr').and.returnValue(['a', 'b', 'c'])
            expect(successRepository.getSuccessMessages()).toEqual(['a', 'b', 'c'])
        })

        it('loads default success messages', function () {
            spyOn(repository, 'getOr').and.returnValue([])
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
