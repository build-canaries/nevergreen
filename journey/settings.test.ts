describe('Settings', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.findByRole('link', {name: 'Settings'}).click()
  })

  it('changing tracking settings', () => {
    cy.findByRole('menuitem', {name: 'Tracking'}).click()

    cy.findByLabelText('Poll for feed changes every').select('60')
  })

  it('changing display settings', () => {
    cy.findByRole('menuitem', {name: 'Display'}).click()

    cy.findByLabelText('Click to show menu').click()

    cy.findByLabelText('Show feed identifier').check()
    cy.findByLabelText('Show build time').check()
    cy.findByLabelText('Show build label').check()

    cy.findByRole('button', {name: 'Preview display'}).click()
    cy.locate('build-label').should('exist')
    cy.locate('tray-name').should('exist')
    cy.locate('duration').should('exist')
    cy.findByRole('button', {name: 'Dismiss'}).click()

    cy.findByLabelText('Show feed identifier').uncheck()
    cy.findByLabelText('Show build time').uncheck()
    cy.findByLabelText('Show build label').uncheck()

    cy.findByRole('button', {name: 'Preview display'}).click()
    cy.locate('build-label').should('not.exist')
    cy.locate('tray-name').should('not.exist')
    cy.locate('duration').should('not.exist')
    cy.findByRole('button', {name: 'Dismiss'}).click()

    cy.findByLabelText('Amount of project to show').select('Large')
    cy.locate('show-prognosis').each((prognosis) => {
      cy.wrap(prognosis).check()
    })

    cy.findByLabelText('Sort projects by').select('prognosis')
  })

  it('adding and removing success messages', () => {
    cy.findByRole('menuitem', {name: 'Success'}).click()

    cy.locate('success-message')
      .should('contain', '=(^.^)=')
      .should('have.length', 1)

    cy.findByRole('button', {name: 'Add message'}).click()
    cy.findByLabelText('Message').type('some message')
    cy.findByRole('button', {name: 'Add message'}).click()

    cy.locate('success-message')
      .should('contain', '=(^.^)=')
      .should('contain', 'some message')

    cy.findByRole('button', {name: 'Add message'}).click()
    cy.findByLabelText('Message').type('https://raw.githubusercontent.com/build-canaries/nevergreen/main/doc/screenshot_monitor.png')
    cy.findByRole('button', {name: 'Add message'}).click()

    cy.locate('success-image').should('be.visible')
  })

  it('changing notification settings', () => {
    cy.findByRole('menuitem', {name: 'Notifications'}).click()

    cy.findByLabelText('Check for new Nevergreen versions').click()
    cy.findByLabelText('Play audio notifications').click()
  })
})
