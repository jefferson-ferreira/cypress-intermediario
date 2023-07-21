import { faker } from '@faker-js/faker'

describe('Create Project', () => {
    beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
    })

    it('successfully', () => {
        const project = {
            name: `project-${faker.datatype.uuid()}`,
        }

        cy.gui_createProject(project)

        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('path')}/${project.name}`)
        cy.get('.home-panel-title').contains(project.name)
    })
})