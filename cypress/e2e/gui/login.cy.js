describe('Login', () => {
  it('successfully', () => {
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const options = { cacheSession: false }

    cy.login(user, password, options)
    cy.get('.top-bar-container > .btn').click()
    cy.get('[data-qa-selector="user_avatar_content"]').should('be.visible')
  })
})