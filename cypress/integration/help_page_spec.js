describe('Help Page', function() {

    beforeEach(() => {
        if (window.navigator && navigator.serviceWorker) {
            navigator.serviceWorker.getRegistrations()
                .then((registrations) => {
                    registrations.forEach((registration) => {
                        registration.unregister()
                    })
                })
        }
    })

    it('It is accessible via the menu', function() {
        cy.visit('/')
        cy.get('[data-locator=menu-help]').click()
        cy.location('pathname').should('include', 'help')
    })
  })