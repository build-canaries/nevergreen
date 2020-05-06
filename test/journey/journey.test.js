/*global cy,Cypress,before */

function shouldBeAbleToChangeTraySettings() {
  cy.locate('tab-Settings').click()
  cy.locate('generate-random').click()
  cy.locate('tray-name').clear().type('renamed tray').blur()
  cy.locate('container-title').should('have.text', 'renamed tray')

  if (Cypress.env('TRAY_URL_TOKEN')) {
    cy.locate('tray-url').clear().type(Cypress.env('TRAY_URL_TOKEN')).blur()
    cy.locate('change-password').click()
    cy.locate('change-authentication').within(() => {
      cy.locate('auth-token').click()
      cy.locate('auth-access-token').type(Cypress.env('TRAY_TOKEN')).blur()
      cy.locate('change-password-update').click()
    })

    // TODO: [#291] wait for the model to close otherwise the a11y check fails (but only when running headless!)
    cy.locate('change-authentication').should('not.be.visible')
  }

  cy.checkA11y()
}

function shouldBeAbleToAddTrays(trayUrl, username, password) {
  cy.visitPage('tracking')

  cy.locate('add-tray-url').type(trayUrl)
  if (username && password) {
    cy.locate('auth-basic').click()
    cy.locate('auth-username').type(username)
    cy.locate('auth-password').type(password)
  }
  cy.locate('add-tray').click()

  cy.locate('tray').should('exist')
  cy.locate('container-sub-title').should('have.text', trayUrl)
  cy.locate('exclude-all').click()
  cy.locate('include-all').click()

  cy.locate('available-projects-list')
    .should('contain', 'failure building project')
    .should('contain', 'failure sleeping project')
    .should('contain', 'success building project')
    .should('contain', 'success sleeping project')

  cy.checkA11y()

  shouldBeAbleToChangeTraySettings()
}

function shouldBeAbleToChangeSuccessMessages() {
  cy.visitPage('success')

  cy.locate('success-message').should('contain', '=(^.^)=').should('have.length', 1)

  cy.addSuccessMessage('some message')
  cy.locate('success-message')
    .should('contain', '=(^.^)=')
    .should('contain', 'some message')

  cy.addSuccessMessage('https://raw.githubusercontent.com/build-canaries/nevergreen/master/doc/screenshot_monitor.png')
  cy.locate('success-image').should('be.visible')

  cy.checkA11y()
}

function shouldBeAbleToChangeSettingsGeneral() {
  cy.locate('refresh-time').select('60')
  cy.locate('click-to-show-menu').click()
}

function shouldBeAbleToChangeSettingsDisplay() {
  cy.locate('show-tray-names').check()
  cy.locate('show-build-times').check()
  cy.locate('show-build-labels').check()

  cy.locate('display-preview').click()
  cy.locate('build-label').should('exist')
  cy.locate('tray-name').should('exist')
  cy.locate('duration').should('exist') // TODO: building vs broken time
  cy.visitPage('settings')

  cy.locate('show-tray-names').uncheck()
  cy.locate('show-build-times').uncheck()
  cy.locate('show-build-labels').uncheck()

  cy.locate('display-preview').click()
  cy.locate('build-label').should('not.exist')
  cy.locate('tray-name').should('not.exist')
  cy.locate('duration').should('not.exist')
  cy.visitPage('settings')

  cy.locate('max-projects-to-show').select('30')
  cy.locate('show-prognosis').each((prognosis) => {
    cy.wrap(prognosis).check()
  })
  // uncheck healthy as we assert it doesn't show on the monitor page
  cy.locate('show-prognosis-container').contains('healthy').click()

  cy.locate('sort-projects-by').select('prognosis')
}

function shouldBeAbleToChangeSettingsNotifications() {
  cy.locate('play-sounds').click()
  // force off so they don't play when the test gets to the Monitor page
  cy.locate('play-sounds').uncheck()

}

function shouldBeAbleToChangeSettings() {
  cy.visitPage('settings')

  shouldBeAbleToChangeSettingsGeneral()
  shouldBeAbleToChangeSettingsDisplay()
  shouldBeAbleToChangeSettingsNotifications()

  // TODO: [#211] Ideally we'd run this with all options enabled, but we have colour contrast issues on the build label/times
  cy.checkA11y()
}

function shouldBeAbleToExportAndImportConfig() {
  cy.visitPage('backup')

  cy.locate('import-data').type('something invalid')
  cy.locate('import').click()
  cy.locate('error-messages').should('exist')

  cy.get('#export-data').then((textarea) => {
    cy.locate('import-data').invoke('val', textarea.val()) // not using type() for speed reasons
    cy.locate('import-data').type(' ') // trigger react updates
    cy.locate('import').click()
  })
  cy.locate('info-messages').should('exist')

  cy.checkA11y()
}

function shouldMonitorSelectedProjects() {
  cy.visitPage('monitor')

  cy.locate('tile')
    .should('contain', 'failure building project')
    .should('contain', 'failure sleeping project')
    .should('contain', 'success building project')
    .should('not.contain', 'success sleeping project')

  cy.checkA11y()
}

describe('Journey', () => {

  before(() => {
    cy.clearIndexDb()
    cy.unregisterServiceWorkers()
  })

  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })

  it('should all work fine', () => {
    shouldBeAbleToAddTrays(
      Cypress.env('TRAY_URL'),
      Cypress.env('TRAY_USERNAME'),
      Cypress.env('TRAY_PASSWORD')
    )
    shouldBeAbleToChangeSuccessMessages()
    shouldBeAbleToChangeSettings()
    shouldBeAbleToExportAndImportConfig()
    shouldMonitorSelectedProjects()
  })
})
