/*global cy,Cypress */

// Enable looking up elements by the 'data-locater' attribute without in a concise way
Cypress.Commands.add('locate', (thing) => {
  cy.get(`[data-locator=${thing}]`)
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
      registrations.forEach((registration) => { registration.unregister() })
    })
  }
})
