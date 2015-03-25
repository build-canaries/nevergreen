/* global describe, it, beforeEach, spyOn, expect */

var repositoryMock = require('../../../src/js/storage/repository')
var storageRepository = require('../../../src/js/storage/trackingRepository')

describe('tracking repository', function () {

    describe('saving to local storage', function () {
        beforeEach(function () {
            spyOn(repositoryMock, 'save')
        })

        it('saves trimmed cctray url', function () {
            storageRepository.saveCctray('some-url')
            expect(repositoryMock.save).toHaveBeenCalledWith('cctray', 'some-url')
        })

        it('saves included projects', function () {
            storageRepository.saveIncludedProjects(['a', 'b', 'c'])
            expect(repositoryMock.save).toHaveBeenCalledWith('includedProjects', ['a', 'b', 'c'])
        })

        it('saves seen projects', function () {
            storageRepository.saveSeenProjects(['a', 'b', 'c'])
            expect(repositoryMock.save).toHaveBeenCalledWith('seenProjects', ['a', 'b', 'c'])
        })

        it('saves username', function () {
            storageRepository.saveUsername('some-username')
            expect(repositoryMock.save).toHaveBeenCalledWith('username', 'some-username')
        })

        it('saves encrypted password', function () {
            storageRepository.savePassword('some-password')
            expect(repositoryMock.save).toHaveBeenCalledWith('password', 'some-password')
        })

        it('saves is authenticated status', function () {
            storageRepository.setIsAuthenticated(true)
            expect(repositoryMock.save).toHaveBeenCalledWith('isAuthenticated', true)
        })
    })

    describe('loading from local storage', function () {
        beforeEach(function () {
            spyOn(repositoryMock, 'getOr')
            spyOn(repositoryMock, 'getArrayOr')
        })

        it('cctray', function () {
            storageRepository.getCctray()
            expect(repositoryMock.getOr).toHaveBeenCalledWith('cctray', '')
        })

        it('included projects', function () {
            storageRepository.getIncludedProjects()
            expect(repositoryMock.getArrayOr).toHaveBeenCalledWith('includedProjects', [])
        })

        it('seen projects', function () {
            storageRepository.getSeenProjects()
            expect(repositoryMock.getArrayOr).toHaveBeenCalledWith('seenProjects', [])
        })

        it('server type', function () {
            storageRepository.getServerType()
            expect(repositoryMock.getOr).toHaveBeenCalledWith('serverType', '')
        })

        it('username', function () {
            storageRepository.getUsername()
            expect(repositoryMock.getOr).toHaveBeenCalledWith('username', '')
        })

        it('encrypted password', function () {
            storageRepository.getPassword()
            expect(repositoryMock.getOr).toHaveBeenCalledWith('password', '')
        })
    })

    describe('has', function () {
        beforeEach(function () {
            spyOn(repositoryMock, 'exists')
        })

        it('cctray', function () {
            storageRepository.hasCctray()
            expect(repositoryMock.exists).toHaveBeenCalledWith('cctray')
        })

        it('included projects', function () {
            storageRepository.hasIncludedProjects()
            expect(repositoryMock.exists).toHaveBeenCalledWith('includedProjects')
        })
    })

    describe('helper functions', function () {
        it('knows what projects are included', function () {
            spyOn(repositoryMock, 'getArrayOr').and.returnValue(['a', 'b', 'c'])
            expect(storageRepository.includesProject('b')).toBeTruthy()
        })

        it('knows no projects are included if none are saved', function () {
            spyOn(repositoryMock, 'getArrayOr').and.returnValue([])
            expect(storageRepository.includesProject('a')).toBeFalsy()
        })

        it('is ready if a cctray and included projects have been set', function () {
            spyOn(repositoryMock, 'exists').and.returnValue(true)
            expect(storageRepository.isReady()).toBeTruthy()
        })

        it('is not ready if no included projects have been set', function () {
            spyOn(repositoryMock, 'exists').and.callFake(function (val) {
                if (val === 'cctray') return true
                if (val === 'includedProjects') return false
            })
            expect(storageRepository.isReady()).toBeFalsy()
        })

        it('is not ready if no cctray has been set', function () {
            spyOn(repositoryMock, 'exists').and.callFake(function (val) {
                if (val === 'cctray') return false
                if (val === 'includedProjects') return true
            })
            expect(storageRepository.isReady()).toBeFalsy()
        })
    })

    describe('authentication', function () {
        it('clears username and password', function () {
            spyOn(repositoryMock, 'clear')

            storageRepository.clearAuthDetails()

            expect(repositoryMock.clear).toHaveBeenCalledWith('username')
            expect(repositoryMock.clear).toHaveBeenCalledWith('password')
        })

        it('loads is authenticated', function () {
            spyOn(repositoryMock, 'getOr').and.returnValue('true')

            var isAuthenticated = storageRepository.isAuthenticated();

            expect(isAuthenticated).toEqual(true)
            expect(repositoryMock.getOr).toHaveBeenCalledWith('isAuthenticated', false)
        })
    })

})
