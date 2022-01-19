describe('Monitoring', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.findByRole('link', {name: 'Settings'}).click()
    cy.findByRole('menuitem', {name: 'Tracking'}).click()
  })

  it('adding and monitoring a feed', () => {
    cy.findByRole('button', {name: 'Add feed'}).click()

    cy.findByLabelText('URL').type(Cypress.env('TRAY_URL'))
    if (Cypress.env('TRAY_USERNAME') && Cypress.env('TRAY_PASSWORD')) {
      cy.findByLabelText('Authentication').select('Basic auth')
      cy.findByLabelText('Username').type(Cypress.env('TRAY_USERNAME'))
      cy.findByLabelText('Password').type(Cypress.env('TRAY_PASSWORD'))
    }
    cy.findByRole('button', {name: 'Check connection'}).click()
    cy.findByText('Connected successfully').should('exist')

    cy.findByRole('button', {name: 'Add feed'}).click()

    cy.findByRole('button', {name: 'Exclude all'}).click()
    cy.findByRole('button', {name: 'Include all'}).click()

    cy.locate('available-projects-list')
      .should('contain', 'failure building project')
      .should('contain', 'failure sleeping project')
      .should('contain', 'success building project')
      .should('contain', 'success sleeping project')

    cy.findByRole('button', {name: 'Back to tracking'}).click()

    cy.findByRole('link', {name: 'Monitor'}).click()

    cy.locate('tile')
      .should('contain', 'failure building project')
      .should('contain', 'failure sleeping project')
      .should('contain', 'success building project')
      .should('not.contain', 'success sleeping project')
  })

  it('updating a feeds details', () => {
    cy.findByRole('button', {name: 'Add feed'}).click()

    cy.findByLabelText('URL').type('http://localhost/not/a/real/url')
    cy.findByRole('button', {name: 'Add feed'}).click()

    cy.findByRole('button', {name: 'Back to tracking'}).click()

    cy.findByRole('button', {name: /Update details for/}).click()

    cy.findByRole('button', {name: 'randomise name'}).click()
    cy.findByLabelText('Name').clear().type('renamed feed')
    cy.findByLabelText('Server type').select('circle')
    cy.findByLabelText('Automatically include new projects').click()

    if (Cypress.env('TRAY_URL_TOKEN')) {
      cy.findByRole('button', {name: 'Update connection'}).click()
      cy.findByLabelText('URL').clear().type(Cypress.env('TRAY_URL_TOKEN'))
      cy.findByLabelText('Authentication').select('Access token')
      cy.findByLabelText('Token').type(Cypress.env('TRAY_TOKEN'))
      cy.findByRole('button', {name: 'Save'}).click()
    }

    cy.findByRole('button', {name: 'Back to tracking'}).click()
    cy.findByRole('heading', {name: 'renamed feed'}).should('exist')
  })
})
