var storageRepository = require('../../../src/js/config/successRepository')

describe('success repository', function () {

    beforeEach(function () {
        localStorage.clear()
    })

    describe('saving to local storage', function () {
        beforeEach(function () {
            spyOn(localStorage, 'setItem')
        })

        it('saves trimmed success text', function () {
            storageRepository.saveSuccessText('  success!  ')
            expect(localStorage.setItem).toHaveBeenCalledWith('successText', 'success!')
        })

        it('saves trimmed success image url', function () {
            storageRepository.saveSuccessImageUrl('  some-url  ')
            expect(localStorage.setItem).toHaveBeenCalledWith('successImageUrl', 'some-url')
        })
    })

    describe('loading from local storage', function () {
        it('loads previously saved success text', function () {
            localStorage.setItem('successText', 'success!')
            expect(storageRepository.getSuccessText()).toEqual('success!')
        })

        it('loads default success text', function () {
            expect(storageRepository.getSuccessText()).toEqual('')
        })

        it('loads previously success image url', function () {
            localStorage.setItem('successImageUrl', 'some-url')
            expect(storageRepository.getSuccessImageUrl()).toEqual('some-url')
        })

        it('loads default success image url', function () {
            expect(storageRepository.getSuccessImageUrl()).toEqual('')
        })
    })

    describe('has', function () {
        it('knows if no success image url is saved', function () {
            expect(storageRepository.hasSuccessImageUrl()).toBeFalsy()
        })

        it('knows when success image url is saved', function () {
            localStorage.setItem('successImageUrl', 'some-url')
            expect(storageRepository.hasSuccessImageUrl()).toBeTruthy()
        })

        it('returns false if a blank success image url is saved', function () {
            localStorage.setItem('successImageUrl', ' ')
            expect(storageRepository.hasSuccessImageUrl()).toBeFalsy()
        })
    })

})
