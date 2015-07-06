jest.dontMock('../../../src/js/storage/successRepository')

var repositoryMock = require('../../../src/js/storage/repository')
var successRepository = require('../../../src/js/storage/successRepository')

describe('success repository', function () {

    describe('saving to local storage', function () {
        it('saves all success messages', function () {
            successRepository.saveSuccessMessages(['a', 'b', 'c'])
            expect(repositoryMock.save).toBeCalledWith('successMessages', ['a', 'b', 'c'])
        })

        it('does not save empty success messages', function () {
            successRepository.saveSuccessMessages(['a', '', null, 'c'])
            expect(repositoryMock.save).toBeCalledWith('successMessages', ['a', 'c'])
        })
    })

    describe('loading from local storage', function () {
        it('loads all success messages', function () {
            repositoryMock.getOr.mockReturnValue(['a', 'b', 'c'])
            expect(successRepository.getSuccessMessages()).toEqual(['a', 'b', 'c'])
        })

        it('loads default success messages', function () {
            repositoryMock.getOr.mockReturnValue([])
            expect(successRepository.getSuccessMessages()).toEqual([])
        })
    })

    describe('has', function () {
        it('success messages', function () {
            successRepository.hasSuccessMessages()
            expect(repositoryMock.exists).toBeCalledWith('successMessages')
        })
    })

})
