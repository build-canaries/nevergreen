var repositoryMock = {
    save: function () {
    },
    getArrayOr: function () {
    },
    exists: function () {
    }
}
var successRepository = require('../../../src/js/storage/successRepository')(repositoryMock)

describe('success repository', function () {

    describe('saving to local storage', function () {
        beforeEach(function () {
            spyOn(repositoryMock, 'save')
        })

        it('saves all success messages', function () {
            successRepository.saveSuccessMessages(['a', 'b', 'c'])
            expect(repositoryMock.save).toHaveBeenCalledWith('successMessages', ['a', 'b', 'c'])
        })
    })

    describe('loading from local storage', function () {
        it('loads all success messages', function () {
            spyOn(repositoryMock, 'getArrayOr').and.returnValue(['a', 'b', 'c'])
            expect(successRepository.getSuccessMessages()).toEqual(['a', 'b', 'c'])
        })

        it('loads default success messages', function () {
            spyOn(repositoryMock, 'getArrayOr').and.returnValue([])
            expect(successRepository.getSuccessMessages()).toEqual([])
        })
    })

    describe('has', function () {
        beforeEach(function () {
            spyOn(repositoryMock, 'exists')
        })

        it('success messages', function () {
            successRepository.hasSuccessMessages()
            expect(repositoryMock.exists).toHaveBeenCalledWith('successMessages')
        })
    })

})
