import '@testing-library/cypress/add-commands'

Cypress.Commands.add('locate', (thing) => {
  cy.get(`[data-locator=${thing}]`)
})

Cypress.Commands.add('visitPage', (menuItem) => {
  cy.locate(`menu-${menuItem}`).click()
  cy.location('pathname').should('include', menuItem)
})

Cypress.Commands.add('clearIndexDb', () => {
  Cypress.on('window:before:load', (window) => {
    window.indexedDB.deleteDatabase('nevergreen')
  })
})

Cypress.Commands.add('unregisterServiceWorkers', () => {
  Cypress.on('window:before:load', (window) => {
    if (window.navigator && window.navigator.serviceWorker) {
      window.navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister())
      })
    }
  })
})
