/*global cy,Cypress */

// enable a11y testing
import 'cypress-axe'

// enable looking up elements by the 'data-locator' attribute in a concise way
Cypress.Commands.add('locate', (thing) => {
  cy.get(`[data-locator=${thing}]`)
})

Cypress.Commands.add('visitPage', (menuItem) => {
  cy.locate(`menu-${menuItem}`).click()
  cy.location('pathname').should('include', menuItem)
})

Cypress.Commands.add('addSuccessMessage', (message) => {
  cy.locate('message').type(message)
  cy.locate('add-message').click()
})

// nuke previous data from test runs
Cypress.Commands.add('clearIndexDb', () => {
  Cypress.on('window:before:load', (win) => {
    win.indexedDB.deleteDatabase('nevergreen')
  })
})

Cypress.Commands.add('unregisterServiceWorkers', () => {
  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister()
      })
    })
  }
})
