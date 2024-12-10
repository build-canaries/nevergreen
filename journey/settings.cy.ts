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
    cy.findByLabelText('Show prognosis name').check()
    cy.findByLabelText('Show build time').check()
    cy.findByLabelText('Show build label').check()

    cy.findByRole('link', { name: 'Preview display' }).click()
    cy.locate('build-label').should('exist')
    cy.locate('tray-name').should('exist')
    cy.locate('duration').should('exist')
    cy.findByRole('button', { name: /dismiss/i }).click()

    cy.findByLabelText('Show feed identifier').uncheck()
    cy.findByLabelText('Show prognosis name').uncheck()
    cy.findByLabelText('Show build time').uncheck()
    cy.findByLabelText('Show build label').uncheck()

    cy.findByRole('link', { name: 'Preview display' }).click()
    cy.locate('build-label').should('not.exist')
    cy.locate('tray-name').should('not.exist')
    cy.locate('duration').should('not.exist')
    cy.findByRole('button', { name: /dismiss/i }).click()

    cy.findByLabelText('Amount of project to show').select('Large')
    cy.findByLabelText('Sort projects by').select('prognosis')
  })

  it('changing prognosis settings', () => {
    cy.findByRole('link', { name: 'Prognosis' }).click()

    cy.findByRole('link', { name: 'Update details for Errors' }).click()
    cy.findByLabelText('Show on Monitor page').check()
    cy.findByLabelText('Show system notification').check()
    cy.findByLabelText('Play audio notification').clear().type('some-sfx')
    cy.findByLabelText('Background colour').clear().type('#aaaaaa')
    cy.findByLabelText('Text colour').clear().type('#aaaaaa')
    cy.findByRole('button', { name: 'Save changes' }).click()

    // Just check all other prognosis exist without changing any details
    cy.findByRole('link', { name: 'Update details for Sick projects' }).click()
    cy.findByRole('link', { name: 'Cancel' }).click()
    cy.findByRole('link', {
      name: 'Update details for Sick building projects',
    }).click()
    cy.findByRole('link', { name: 'Cancel' }).click()
    cy.findByRole('link', {
      name: 'Update details for Healthy building projects',
    }).click()
    cy.findByRole('link', { name: 'Cancel' }).click()
    cy.findByRole('link', {
      name: 'Update details for Unknown projects',
    }).click()
    cy.findByRole('link', { name: 'Cancel' }).click()
    cy.findByRole('link', {
      name: 'Update details for Healthy projects',
    }).click()
    cy.findByRole('link', { name: 'Cancel' }).click()
  })

  it('adding and removing success messages', () => {
    cy.findByRole('link', { name: 'Success' }).click()

    cy.findByRole('list', { name: 'messages' })
      .should('contain', '=(^.^)=')
      .findAllByRole('listitem')
      .should('have.length', 1)

    cy.findByRole('link', { name: 'Add message' }).click()
    cy.findByLabelText('Message').type('some message')
    cy.findByRole('button', { name: 'Add message' }).click()

    cy.findByRole('list', { name: 'messages' })
      .should('contain', '=(^.^)=')
      .should('contain', 'some message')
      .findAllByRole('listitem')
      .should('have.length', 2)

    cy.findByRole('link', { name: 'Add message' }).click()
    cy.findByLabelText('Message').type(
      'https://raw.githubusercontent.com/build-canaries/nevergreen/main/doc/screenshot_monitor.png',
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
