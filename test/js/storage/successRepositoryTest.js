var storageRepository = require('../../../src/js/storage/successRepository')

describe('success repository', function () {

    beforeEach(function () {
        localStorage.clear()
    })

    describe('saving to local storage', function () {
        beforeEach(function () {
            spyOn(localStorage, 'setItem')
        })

        it('saves all success messages', function () {
            storageRepository.saveSuccessMessages(['a', 'b', 'c'])
            expect(localStorage.setItem).toHaveBeenCalledWith('successMessages', ['a', 'b', 'c'])
        })
    })

    describe('loading from local storage', function () {
        it('loads all success messages', function () {
            localStorage.setItem('successMessages', ['a', 'b', 'c'])
            expect(storageRepository.getSuccessMessages()).toEqual(['a', 'b', 'c'])
        })

        it('loads default success messages', function () {
            expect(storageRepository.getSuccessMessages()).toEqual([])
        })
    })

})
