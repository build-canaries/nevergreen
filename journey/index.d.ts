declare namespace Cypress {
  interface Chainable {
    locate(thing: string): Chainable<Element>;

    visitPage(menuItem: string): Chainable<Element>;

    clearIndexDb(): Chainable<Element>;

    unregisterServiceWorkers(): Chainable<Element>;
  }
}
