/*global describe,before,it,cy,Cypress */

describe('Journey', function () {

  before(function () {
    cy.clearIndexDb()
    cy.unregisterServiceWorkers()
  })

  it('should all work fine', function () {
    cy.visit('/')

    shouldBeAbleToAddTrays(Cypress.env('TRAY_URL'), Cypress.env('TRAY_USERNAME'), Cypress.env('TRAY_PASSWORD'))
    shouldBeAbleToChangeMessages()
    shouldBeAbleToChangeSettings()
    shouldBeAbleToExportAndImportConfig()
    shouldMonitor()
  })

  function shouldBeAbleToAddTrays(trayUrl, username, password) {
    cy.location('pathname').should('include', 'tracking')

    cy.locate('add-tray-url').type(trayUrl)
    if (username && password) {
      cy.locate('add-tray-username').type(username)
      cy.locate('add-tray-password').type(password)
    }
    cy.locate('add-tray').click()

    cy.locate('tray').should('exist')
    cy.locate('container-sub-title').should('have.text', trayUrl)
    cy.locate('exclude-all').click()
    cy.locate('include-all').click()
    cy.locate('tab-settings').click()
    cy.locate('generate-random').click()
    cy.locate('tray-name').clear().type('renamed tray').blur()
    cy.locate('container-title').should('have.text', 'renamed tray')
    cy.locate('tab-projects').click()
    cy.locate('available-projects-list').contains('failure building project')
    cy.locate('available-projects-list').contains('failure sleeping project')
    cy.locate('available-projects-list').contains('success building project')
    cy.locate('available-projects-list').contains('success sleeping project')
  }

  function shouldBeAbleToChangeMessages() {
    cy.locate('menu-success').click()
    cy.location('pathname').should('include', 'success')
    cy.locate('message').type('some message')
    cy.locate('add-message').click()
    cy.locate('success-message').contains('=(^.^)=')
    cy.locate('success-message').contains('some message')

    cy.locate('message')
      .type('https://raw.githubusercontent.com/build-canaries/nevergreen/master/doc/screenshot_monitor.png')
    cy.locate('add-message').click()
    cy.locate('success-image').should('be.visible')
  }

  function shouldBeAbleToChangeSettings() {
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
    cy.locate('duration').should('exist') // TODO: building vs broken time

    cy.locate('show-tray-names').uncheck()
    cy.locate('show-build-times').uncheck()
    cy.locate('show-broken-build-times').uncheck()
    cy.locate('show-build-labels').uncheck()
    cy.locate('max-projects-to-show').select('30')
    cy.locate('build-label').should('not.exist')
    cy.locate('tray-name').should('not.exist')
    cy.locate('duration').should('not.exist')
  }

  function shouldBeAbleToExportAndImportConfig() {
    cy.locate('menu-backup').click()
    cy.location('pathname').should('include', 'backup')
    
    cy.locate('import-data').type('something invalid')
    cy.locate('import').click()
    cy.locate('error-messages').should('exist')

    cy.get('#export-data').then((textarea) => {
      cy.locate('import-data').invoke('val', textarea.val()) // not using type() for speed reasons
      cy.locate('import-data').type(' ') // trigger react updates
      cy.locate('import').click()
    })
    cy.locate('info-messages').should('exist')
  }

  function shouldMonitor() {
    cy.locate('menu-monitor').click()
    cy.location('pathname').should('include', 'monitor')
    
    cy.locate('interesting-project').contains('success building project').should('exist')
    cy.locate('interesting-project').contains('failure sleeping project').should('exist')
    cy.locate('interesting-project').contains('failure building project').should('exist')
    cy.locate('interesting-project').contains('success-sleeping-project').should('not.exist')
  }
})  
