describe('Backups', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.findByRole('link', {name: 'Settings'}).click()
    cy.findByRole('menuitem', {name: 'Backup'}).click()
  })

  it('exporting and importing configuration locally', () => {
    cy.findByRole('button', {name: 'Export locally'}).click()

    cy.findByLabelText('Current configuration').then((exportInput) => {
      cy.findByRole('link', {name: 'Settings'}).click()
      cy.findByRole('menuitem', {name: 'Backup'}).click()

      cy.findByRole('button', {name: 'Import local'}).click()

      cy.findByLabelText('Configuration to import').invoke('val', exportInput.val()) // not using type() for speed reasons
      cy.findByLabelText('Configuration to import').type(' ') // trigger react updates
      cy.findByRole('button', {name: 'Import'}).click()

      cy.location('pathname').should('eq', '/settings/backup')
    })
  })

  it('adding and removing a remote backup', () => {
    cy.findByRole('button', {name: 'Add remote backup'}).click()
    cy.findByLabelText('URL').type('http://test')
    cy.findByRole('button', {name: 'Add location'}).click()

    cy.findByText('Custom server').should('exist')
    cy.findByText('http://test').should('exist')

    cy.findByRole('button', {name: 'Remove Remote backup 1'}).click()

    cy.findByText('Custom server').should('not.exist')
  })
})