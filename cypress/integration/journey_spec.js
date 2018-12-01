describe('Journey', function () {

  beforeEach(() => {
    if (window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations()
        .then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister()
          })
        })
    }


  })

  function locate(thing) {
    return `[data-locator=${thing}]`
  }

  it('do', function () {
    Cypress.on('window:before:load', win => {
      win.indexedDB.deleteDatabase('nevergreen')
    })

    cy.visit('/')

    cy.get(locate('version')).contains(Cypress.env('FULL_VERSION'))

    cy.location('pathname').should('include', 'tracking')

    cy.get(locate('add-tray-url')).type(Cypress.env('TRAY_URL'))
    cy.get(locate('add-tray-username')).type(Cypress.env('TRAY_USERNAME'))
    cy.get(locate('add-tray-password')).type(Cypress.env('TRAY_PASSWORD'))
    cy.get(locate('add-tray')).click()

    cy.get(locate('tray'))
      .get(locate('container-sub-title'))
      .contains('http://localhost:5050/secure/cctray.xml')
      .get(locate('exclude-all')).click()
      .get(locate('include-all')).click()
      .get(locate('tab-settings')).click()
      .get(locate('generate-random')).click()
      .get(locate('tray-name')).clear().type('renamed tray').blur()
      .get(locate('container-title')).contains(/^renamed tray$/)
      .get(locate('tab-projects')).click()
      .get(locate('available-projects-list')).contains('failure building project')
      .get(locate('available-projects-list')).contains('failure sleeping project')
      .get(locate('available-projects-list')).contains('success building project')
      .get(locate('available-projects-list')).contains('success sleeping project')

    cy.get(locate('menu-success')).click()
    cy.location('pathname').should('include', 'success')
    cy.get(locate('message')).type('some message')
    cy.get(locate('add-message')).click()
    cy.get(locate('success-message')).contains('=(^.^)=')
    cy.get(locate('success-message')).contains('some message')

    cy.get(locate('message'))
      .type('https://raw.githubusercontent.com/build-canaries/nevergreen/master/doc/screenshot.png')
    cy.get(locate('add-message')).click()
    cy.get(locate('success-image')).should('be.visible')

    // settings
    cy.get(locate('menu-settings')).click()
    cy.location('pathname').should('include', 'settings')

    cy.get(locate('play-sounds')).click()
    cy.get(locate('refresh-time')).select('60')
    cy.get(locate('click-to-show-menu')).click()

    cy.get(locate('show-tray-names')).check()
    cy.get(locate('show-build-times')).check()
    cy.get(locate('show-broken-build-times')).check()
    cy.get(locate('show-build-labels')).check()
    cy.get(locate('max-projects-to-show')).select('6')
    cy.get(locate('build-label')).should('exist')
    cy.get(locate('tray-name')).should('exist')
    cy.get(locate('duration')).should('exist') // todo: building vs broken time

    cy.get(locate('show-tray-names')).uncheck()
    cy.get(locate('show-build-times')).uncheck()
    cy.get(locate('show-broken-build-times')).uncheck()
    cy.get(locate('show-build-labels')).uncheck()
    cy.get(locate('max-projects-to-show')).select('30')
    cy.get(locate('build-label')).should('not.exist')
    cy.get(locate('tray-name')).should('not.exist')
    cy.get(locate('duration')).should('not.exist')
  })
})
