import '@testing-library/cypress/add-commands'

Cypress.Promise.onPossiblyUnhandledRejection((error) => {
  throw error
})

Cypress.Keyboard.defaults({
  keystrokeDelay: 0
})

Cypress.Commands.add('locate', (thing: string) => {
  cy.get(`[data-locator=${thing}]`)
})

Cypress.on('window:before:load', (win) => {
  win.indexedDB.deleteDatabase('nevergreen')
  // Stop the code from registering the service worker as it messes up the tests
  // @ts-ignore
  // noinspection JSConstantReassignment
  delete win.navigator.__proto__.serviceWorker
})
