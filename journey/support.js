/*global cy,Cypress */

import 'cypress-axe'
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('locate', (thing) => {
  cy.get(`[data-locator=${thing}]`)
})

Cypress.Commands.add('visitPage', (menuItem) => {
  cy.locate(`menu-${menuItem}`).click()
  cy.location('pathname').should('include', menuItem)
})

Cypress.Commands.add('clearIndexDb', () => {
  cy.window().then((window) => {
    window.indexedDB.deleteDatabase('nevergreen')
  })
})

Cypress.Commands.add('unregisterServiceWorkers', () => {
  cy.window().then(async (window) => {
    if (window.navigator && window.navigator.serviceWorker) {
      window.navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister())
      })
    }
  })
})
