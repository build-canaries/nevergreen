function shouldBeAbleToChangeFeedSettings() {
  cy.findByRole('tab', {name: 'Settings'}).click()
  cy.findByRole('button', {name: 'randomise name'}).click()
  cy.findByLabelText('Name').clear().type('renamed tray').blur()
  cy.findByRole('heading', {name: 'renamed tray'}).should('exist')

  if (Cypress.env('TRAY_URL_TOKEN')) {
    cy.locate('tray-url').clear().type(Cypress.env('TRAY_URL_TOKEN')).blur()
    cy.findByRole('button', {name: 'Change auth'}).click()
    cy.locate('modal').within(() => {
      cy.findByLabelText('Access token').click()
      cy.findByLabelText('Token').type(Cypress.env('TRAY_TOKEN')).blur()
      cy.findByRole('button', {name: 'Save'}).click()
    })
  }

  cy.checkA11y()
}

function shouldBeAbleToAddFeeds(trayUrl: string, username: string, password: string) {
  cy.visitPage('tracking')

  cy.findByLabelText('URL').type(trayUrl)
  if (username && password) {
    cy.findByLabelText('Basic auth').click()
    cy.findByLabelText('Username').type(username)
    cy.findByLabelText('Password').type(password)
  }
  cy.findByRole('button', {name: 'Add feed'}).click()

  cy.locate('tray').should('exist')
  cy.findByRole('button', {name: 'Exclude all'}).click()
  cy.findByRole('button', {name: 'Include all'}).click()

  cy.locate('available-projects-list')
    .should('contain', 'failure building project')
    .should('contain', 'failure sleeping project')
    .should('contain', 'success building project')
    .should('contain', 'success sleeping project')

  cy.checkA11y()

  shouldBeAbleToChangeFeedSettings()
}

function shouldBeAbleToChangeSuccessMessages() {
  cy.locate('success-message')
    .should('contain', '=(^.^)=')
    .should('have.length', 1)

  cy.findByRole('link', {name: 'Add message'}).click()
  cy.findByLabelText('Message').type('some message')
  cy.findByRole('button', {name: 'Add message'}).click()

  cy.locate('success-message')
    .should('contain', '=(^.^)=')
    .should('contain', 'some message')

  cy.findByRole('link', {name: 'Add message'}).click()
  cy.findByLabelText('Message').type('https://raw.githubusercontent.com/build-canaries/nevergreen/master/doc/screenshot_monitor.png')
  cy.findByRole('button', {name: 'Add message'}).click()

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
  cy.locate('duration').should('exist')
  cy.visitPage('settings')

  cy.locate('show-tray-names').uncheck()
  cy.locate('show-build-times').uncheck()
  cy.locate('show-build-labels').uncheck()

  cy.locate('display-preview').click()
  cy.locate('build-label').should('not.exist')
  cy.locate('tray-name').should('not.exist')
  cy.locate('duration').should('not.exist')
  cy.visitPage('settings')

  cy.locate('max-projects-to-show').select('Large')
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
  shouldBeAbleToChangeSuccessMessages()
  shouldBeAbleToChangeSettingsNotifications()

  cy.checkA11y()
}

function shouldBeAbleToExportAndImportConfig() {
  cy.visitPage('settings')

  cy.findByRole('link', {name: 'Export'}).click()

  cy.findByLabelText('Current configuration').then((exportInput) => {
    cy.visitPage('settings')

    cy.findByRole('link', {name: 'Import'}).click()

    cy.findByLabelText('Configuration to import').invoke('val', exportInput.val()) // not using type() for speed reasons
    cy.findByLabelText('Configuration to import').type(' ') // trigger react updates
    cy.findByRole('button', {name: 'Import'}).click()

    cy.location('pathname').should('eq', '/settings')
  })
}

function shouldBeAbleToAddARemoteBackup() {
  cy.visitPage('settings')

  cy.findByRole('link', {name: 'Add remote backup'}).click()
  cy.findByLabelText('URL').type('http://test')
  cy.findByRole('button', {name: 'Add location'}).click()

  cy.findByText('Custom server').should('exist')
  cy.findByText('http://test').should('exist')
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

  beforeEach(() => {
    cy.unregisterServiceWorkers()
    cy.clearIndexDb()

    cy.visit('/')
    cy.injectAxe()
  })

  it('should all work fine', () => {
    shouldBeAbleToAddFeeds(
      Cypress.env('TRAY_URL'),
      Cypress.env('TRAY_USERNAME'),
      Cypress.env('TRAY_PASSWORD')
    )
    shouldBeAbleToChangeSettings()
    shouldBeAbleToExportAndImportConfig()
    shouldBeAbleToAddARemoteBackup()
    shouldMonitorSelectedProjects()
  })
})
