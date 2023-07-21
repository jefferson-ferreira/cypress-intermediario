import { faker } from '@faker-js/faker'

describe('Set label on issue', () => {
  const issue = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }
  }

  const label = {
    name: `label-${faker.random.word()}`,
    color: '#ffaabb'
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.api_createIssue(issue)
      .then(response => {
        cy.api_createLabel(response.body.project_id, label)
        cy.login()
        cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/-/issues/${response.body.iid}`)
      })
  })

  it('successfully', () => {
    cy.gui_setLabelOnIssue(label)
    cy.get('[data-testid="collapsed-content"] > [data-testid="value-wrapper"]').contains(label.name)
    cy.get('[data-testid="collapsed-content"] > [data-testid="value-wrapper"] > span')
      .should('have.attr', 'style', `--label-background-color:${label.color}; --label-inset-border:inset 0 0 0 2px #ffaabb;`)
  })
})
