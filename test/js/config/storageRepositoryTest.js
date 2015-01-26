var storageRepository = require('../../../src/js/config/storageRepository')

describe('Configurable build monitor', function () {

    beforeEach(function () {
        localStorage.clear()
    })

    describe('saving to local storage', function () {
        beforeEach(function () {
            spyOn(localStorage, 'setItem')
        })

        it('saves trimmed cctray url', function () {
            storageRepository.saveCctray('  some-url  ')
            expect(localStorage.setItem).toHaveBeenCalledWith('cctray', 'some-url')
        })

        it('saves included projects', function () {
            storageRepository.saveIncludedProjects(['a', 'b', 'c'])
            expect(localStorage.setItem).toHaveBeenCalledWith('includedProjects', ['a', 'b', 'c'])
        })

        it('saves trimmed success text', function () {
            storageRepository.saveSuccessText('  success!  ')
            expect(localStorage.setItem).toHaveBeenCalledWith('successText', 'success!')
        })

        it('saves seen projects', function () {
            storageRepository.saveSeenProjects(['a', 'b', 'c'])
            expect(localStorage.setItem).toHaveBeenCalledWith('seenProjects', ['a', 'b', 'c'])
        })

        it('saves trimmed server type', function () {
            storageRepository.saveServerType('  some-type  ')
            expect(localStorage.setItem).toHaveBeenCalledWith('serverType', 'some-type')
        })

        it('saves trimmed success image url', function () {
            storageRepository.saveSuccessImageUrl('  some-url  ')
            expect(localStorage.setItem).toHaveBeenCalledWith('successImageUrl', 'some-url')
        })
    })

    describe('loading from local storage', function () {
        it('loads previously saved cctray', function () {
            localStorage.setItem('cctray', 'some-url')
            expect(storageRepository.getCctray()).toEqual('some-url')
        })

        it('loads default cctray', function () {
            expect(storageRepository.getCctray()).toEqual('')
        })

        it('loads previously saved included projects', function () {
            localStorage.setItem('includedProjects', ['a', 'b', 'c'])
            expect(storageRepository.getIncludedProjects()).toEqual(['a', 'b', 'c'])
        })

        it('loads default included projects', function () {
            expect(storageRepository.getIncludedProjects()).toEqual([])
        })

        it('loads previously saved success text', function () {
            localStorage.setItem('successText', 'success!')
            expect(storageRepository.getSuccessText()).toEqual('success!')
        })

        it('loads default success text', function () {
            expect(storageRepository.getSuccessText()).toEqual('')
        })

        it('loads previously saved seen projects', function () {
            localStorage.setItem('seenProjects', ['a', 'b', 'c'])
            expect(storageRepository.getSeenProjects()).toEqual(['a', 'b', 'c'])
        })

        it('loads default seen projects', function () {
            expect(storageRepository.getSeenProjects()).toEqual([])
        })

        it('loads previously saved server type', function () {
            localStorage.setItem('serverType', 'some-type')
            expect(storageRepository.getServerType()).toEqual('some-type')
        })

        it('loads default server type', function () {
            expect(storageRepository.getServerType()).toEqual('')
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
        it('knows if no cctray url is saved', function () {
            expect(storageRepository.hasCctray()).toBeFalsy()
        })

        it('knows when cctray url is saved', function () {
            localStorage.setItem('cctray', 'some-url')
            expect(storageRepository.hasCctray()).toBeTruthy()
        })

        it('returns false if a blank cctray url is saved', function () {
            localStorage.setItem('cctray', ' ')
            expect(storageRepository.hasCctray()).toBeFalsy()
        })

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

    describe('helper functions', function () {
        it('knows what projects are included', function () {
            localStorage.setItem('includedProjects', ['a', 'b', 'c'])
            expect(storageRepository.includesProject('b')).toBeTruthy()
        })

        it('knows no projects are included if none are saved', function () {
            expect(storageRepository.includesProject('a')).toBeFalsy()
        })

        it('is ready if a cctray and included projects have been set', function () {
            localStorage.setItem('cctray', 'some-url')
            localStorage.setItem('includedProjects', ['a', 'b', 'c'])
            expect(storageRepository.isReady()).toBeTruthy()
        })

        it('is not ready if no included projects have been set', function () {
            localStorage.setItem('cctray', 'some-url')
            expect(storageRepository.isReady()).toBeFalsy()
        })

        it('is not ready if no cctray has been set', function () {
            localStorage.setItem('includedProjects', ['a', 'b', 'c'])
            expect(storageRepository.isReady()).toBeFalsy()
        })
    })

})
