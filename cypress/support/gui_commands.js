Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},
) => {
  const login = () => {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/users/sign_in')
  }

  const options = {
    cacheAcrossSpecs: true,
    validate,
  }

  if (cacheSession) {
    cy.session(user, login, options)
  } else {
    login()
  }
})

Cypress.Commands.add('logout', () => {
  cy.get('.top-bar-container > .btn').click()
  cy.get('.gl-button-text > .gl-avatar').click()
  cy.contains('Sign out').click()
})

Cypress.Commands.add('gui_createProject', project => {
  cy.visit('/projects/new')
  cy.get('[href="#blank_project"]').click()
  cy.get('#project_name').type(project.name)
  cy.contains('Create project').click()
})

Cypress.Commands.add('gui_createIssue', issue => {
  cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/-/issues/new`)

  cy.get('#issue_title').type(issue.title)
  cy.get('#issue_description').type(issue.description)
  cy.contains('Create issue').click()
})

Cypress.Commands.add('gui_setLabelOnIssue', label => {
  cy.get('[data-testid="sidebar-labels"] > :nth-child(1) > .gl-line-height-20 > [data-testid="edit-button"]').click()
  cy.contains(label.name).click()
  cy.get('body').click()
})

Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
  cy.get('.block.milestone .gl-button-text').click()
  cy.contains(milestone.title).click()
})