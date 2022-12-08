declare namespace Cypress {
  interface Chainable {
    locate(thing: string): Chainable<Element>
  }
}
