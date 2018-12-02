/*global describe,before,it,cy,Cypress */

describe('Journey', function () {

  before(function () {
    cy.clearIndexDb()
    cy.unregisterServiceWorkers()
  })

  it('should all work fine', function () {
    cy.visit('/')
    cy.location('pathname').should('include', 'tracking')

    cy.locate('add-tray-url').type(Cypress.env('TRAY_URL'))
    if(Cypress.env('TRAY_USERNAME') && Cypress.env('TRAY_PASSWORD')) {
      cy.locate('add-tray-username').type(Cypress.env('TRAY_USERNAME'))
      cy.locate('add-tray-password').type(Cypress.env('TRAY_PASSWORD'))
    }
    cy.locate('add-tray').click()

    cy.locate('tray')
      .locate('container-sub-title').should('have.text', Cypress.env('TRAY_URL'))
      .locate('exclude-all').click()
      .locate('include-all').click()
      .locate('tab-settings').click()
      .locate('generate-random').click()
      .locate('tray-name').clear().type('renamed tray').blur()
      .locate('container-title').should('have.text', 'renamed tray')
      .locate('tab-projects').click()
      .locate('available-projects-list').contains('failure building project')
      .locate('available-projects-list').contains('failure sleeping project')
      .locate('available-projects-list').contains('success building project')
      .locate('available-projects-list').contains('success sleeping project')

    cy.locate('menu-success').click()
    cy.location('pathname').should('include', 'success')
    cy.locate('message').type('some message')
    cy.locate('add-message').click()
    cy.locate('success-message').contains('=(^.^)=')
    cy.locate('success-message').contains('some message')

    cy.locate('message')
      .type('https://raw.githubusercontent.com/build-canaries/nevergreen/master/doc/screenshot.png')
    cy.locate('add-message').click()
    cy.locate('success-image').should('be.visible')

    // settings
    cy.locate('menu-settings').click()
    cy.location('pathname').should('include', 'settings')

    cy.locate('play-sounds').click()
    cy.locate('refresh-time').select('60')
    cy.locate('click-to-show-menu').click()

    cy.locate('show-tray-names').check()
    cy.locate('show-build-times').check()
    cy.locate('show-broken-build-times').check()
    cy.locate('show-build-labels').check()
    cy.locate('max-projects-to-show').select('6')
    cy.locate('build-label').should('exist')
    cy.locate('tray-name').should('exist')
    cy.locate('duration').should('exist') // todo: building vs broken time

    cy.locate('show-tray-names').uncheck()
    cy.locate('show-build-times').uncheck()
    cy.locate('show-broken-build-times').uncheck()
    cy.locate('show-build-labels').uncheck()
    cy.locate('max-projects-to-show').select('30')
    cy.locate('build-label').should('not.exist')
    cy.locate('tray-name').should('not.exist')
    cy.locate('duration').should('not.exist')
  })
})
