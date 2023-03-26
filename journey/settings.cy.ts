describe('Settings', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.findByRole('link', { name: 'Settings' }).click()
  })

  it('changing tracking settings', () => {
    cy.findByRole('link', { name: 'Tracking' }).click()

    cy.findByLabelText('Poll for feed changes every').select('60')
  })

  it('changing display settings', () => {
    cy.findByRole('link', { name: 'Display' }).click()

    cy.findByLabelText('Show feed identifier').check()
    cy.findByLabelText('Show build time').check()
    cy.findByLabelText('Show build label').check()

    cy.findByRole('button', { name: 'Preview display' }).click()
    cy.locate('build-label').should('exist')
    cy.locate('tray-name').should('exist')
    cy.locate('duration').should('exist')
    cy.findByRole('button', { name: /dismiss/i }).click()

    cy.findByLabelText('Show feed identifier').uncheck()
    cy.findByLabelText('Show build time').uncheck()
    cy.findByLabelText('Show build label').uncheck()

    cy.findByRole('button', { name: 'Preview display' }).click()
    cy.locate('build-label').should('not.exist')
    cy.locate('tray-name').should('not.exist')
    cy.locate('duration').should('not.exist')
    cy.findByRole('button', { name: /dismiss/i }).click()

    cy.findAllByLabelText('Show on the Monitor page').each((prognosis) => {
      cy.wrap(prognosis).check()
    })

    cy.findByLabelText('Amount of project to show').select('Large')
    cy.findByLabelText('Sort projects by').select('prognosis')
  })

  it('adding and removing success messages', () => {
    cy.findByRole('link', { name: 'Success' }).click()

    cy.findByRole('list', { name: 'messages' })
      .should('contain', '=(^.^)=')
      .findAllByRole('listitem')
      .should('have.length', 1)

    cy.findByRole('button', { name: 'Add message' }).click()
    cy.findByLabelText('Message').type('some message')
    cy.findByRole('button', { name: 'Add message' }).click()

    cy.findByRole('list', { name: 'messages' })
      .should('contain', '=(^.^)=')
      .should('contain', 'some message')
      .findAllByRole('listitem')
      .should('have.length', 2)

    cy.findByRole('button', { name: 'Add message' }).click()
    cy.findByLabelText('Message').type(
      'https://raw.githubusercontent.com/build-canaries/nevergreen/main/doc/screenshot_monitor.png'
    )
    cy.findByRole('button', { name: 'Add message' }).click()

    cy.findByRole('img', { name: 'success' }).should('exist')
    cy.findByRole('list', { name: 'messages' })
      .findAllByRole('listitem')
      .should('have.length', 3)
  })

  it('changing notification settings', () => {
    cy.findByRole('link', { name: 'Notifications' }).click()

    cy.findByLabelText('Check for new Nevergreen versions').click()
    cy.findByLabelText('Allow audio notifications').click()
  })

  it('changing other settings', () => {
    cy.findByRole('link', { name: 'Other' }).click()

    cy.findByLabelText('Click to show menu').click()
  })
})
