var $ = require('jquery')
var adminView = require('../../../src/js/config/adminView')

describe('view logic', function () {

    var adminControllerMock = {
        getProjects: function () {
        },
        saveSeenProjects: function () {
        }
    }

    var storageRepositoryMock = {
        hasCctray: function () {
        },
        saveCctray: function () {
        },
        getSuccessText: function () {
        },
        getSuccessImageUrl: function () {
        },
        hasSuccessImageUrl: function () {
        },
        saveSuccessText: function () {
        },
        saveSuccessImageUrl: function () {
        },
        saveIncludedProjects: function () {
        },
        getCctray: function () {
        },
        saveSeenProjects: function () {
        },
        cctraySeen: function () {
        }
    }

    var projectsViewMock = {
        findIncludedProjects: function () {
        },
        includeAll: function () {
        },
        excludeAll: function () {
        },
        listProjects: function () {
        }
    }

    beforeEach(function () {
        $('body').empty()
        $('body').append('<div id="projects"/>')
        localStorage.clear()
        view = adminView(adminControllerMock, storageRepositoryMock, projectsViewMock)
    })

    describe('autoloads projects', function () {
        it('does if cctray is available', function () {
            spyOn(storageRepositoryMock, 'hasCctray').and.returnValue(true)
            spyOn(storageRepositoryMock, 'getCctray')
            spyOn(adminControllerMock, 'getProjects')

            view.init()

            expect(adminControllerMock.getProjects).toHaveBeenCalled()
            expect(storageRepositoryMock.getCctray).toHaveBeenCalled()
        })

        it('does not if cctray is unavailable', function () {
            spyOn(storageRepositoryMock, 'hasCctray').and.returnValue(false)
            spyOn(adminControllerMock, 'getProjects')

            view.init()

            expect(adminControllerMock.getProjects).not.toHaveBeenCalled()
        })
    })

    describe('spinner', function () {
        it('is shown', function () {
            $('body').append('<div id="loading-modal"></div><div id="spinner" style="display: none"></div>')

            view.showSpinner()

            expect($('#spinner')).toBeVisible()
            expect($('#loading-modal')).toHaveClass('loading')
        })

        it('is hidden', function () {
            $('body').append('<div id="loading-modal"></div><div id="spinner"></div>')

            view.hideSpinner()

            expect($('#spinner')).not.toBeVisible()
            expect($('#loading-modal')).not.toHaveClass('loading')
        })
    })

    describe('cctray url', function () {
        it('saves on return key press', function () {
            spyOn(storageRepositoryMock, 'saveCctray')

            $('body').append('<form>' +
            '<input id="cctray-url" type=text>' +
            '</form>')

            view.init()
            $('#cctray-url').val('some-url')

            // press return event
            var e = jQuery.Event('keypress');
            e.which = 13;
            e.keyCode = 13;
            $('#cctray-url').trigger(e);

            expect(storageRepositoryMock.saveCctray).toHaveBeenCalledWith('some-url')
        })
    })

    describe('fetch projects saves afterwards', function () {
        it('saves', function () {
            spyOn(storageRepositoryMock, 'saveIncludedProjects')

            view.appendProjects([])

            expect(storageRepositoryMock.saveIncludedProjects).toHaveBeenCalled()
        })
    })

    it('handles errors', function () {
        view.errorHandler('code', 'reason')

        expect($('#projects')).toContainHtml('reason')
    })

    describe('success', function () {
        beforeEach(function () {
            $('body').append('<form>' +
            '<input id="success-text" type=text name=success-text/>' +
            '<input id="success-image-url" type=text name=success-image/>' +
            '<input id="save-success-configuration" class=button type=button>' +
            '</form> ' +
            '<img id="success-image" src="" class="hidden"/>')
        })

        describe('success text', function () {
            it('saves', function () {
                view.addClickHandlers()
                $('#success-text').val('expected')
                spyOn(storageRepositoryMock, 'saveSuccessText')

                $('#save-success-configuration').click()

                expect(storageRepositoryMock.saveSuccessText).toHaveBeenCalledWith('expected')
            })

            it('loads', function () {
                spyOn(storageRepositoryMock, 'getSuccessText').and.returnValue('any old value')
                var textInput = $('#success-text')

                view.init()

                expect(textInput.val()).toBe('any old value')
            })
        })

        describe('success image', function () {
            it('loads', function () {
                spyOn(storageRepositoryMock, 'getSuccessImageUrl').and.returnValue('any old value')
                spyOn(storageRepositoryMock, 'hasSuccessImageUrl').and.returnValue(true)
                var successImageUrl = $('#success-image-url')

                view.init()

                var imageSrc = $('#success-image').attr('src');
                expect(successImageUrl.val()).toBe('any old value')
                expect(imageSrc).toBe('any old value')
                expect($('#success-image')).not.toHaveClass('hidden')
            })

            it('saves and shows image on the page', function () {
                view.init()
                $('#success-image-url').val('expected-image-url')
                spyOn(storageRepositoryMock, 'saveSuccessImageUrl')

                $('#save-success-configuration').click()

                var imageSrc = $('#success-image').attr('src');
                expect(imageSrc).toBe('expected-image-url')
                expect($('#success-image')).not.toHaveClass('hidden')
                expect(storageRepositoryMock.saveSuccessImageUrl).toHaveBeenCalledWith('expected-image-url')
            })
        })
    })

})
