/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add(
	'mockLoginWithAuthorization',
	(email: string, password: string) => {
		cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', {
			fixture: 'signin.json',
		}).as('postLogin');

		cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
			fixture: 'ingredients.json',
		}).as('getIngredients');

		window.localStorage.setItem('refreshToken', 'mock-refresh-token');

		cy.visit('/#/login');
		cy.get('[data-testid="email-input"]').type(`${email}{enter}`);
		cy.get('[data-testid="password-input"]').type(`${password}{enter}`);

		cy.wait('@postLogin').its('request.body').should('deep.equal', {
			email,
			password,
		});
	}
);

Cypress.Commands.add('fillConstructor', () => {
	const dataTransfer = new DataTransfer();

	// Добавляем булку
	cy.get('[data-testid="menu-bun"] [data-testid="ingredient-item"]')
		.first()
		.trigger('dragstart', { dataTransfer });
	cy.get('[data-testid="constructor-bun-top"]').trigger('drop', {
		dataTransfer,
	});

	// Добавляем соус
	cy.get('[data-testid="menu-sauce"] [data-testid="ingredient-item"]')
		.first()
		.trigger('dragstart', { dataTransfer });
	cy.get('[data-testid="constructor-fillings"]').trigger('drop', {
		dataTransfer,
	});

	// Добавляем основной ингредиент
	cy.get('[data-testid="menu-main"] [data-testid="ingredient-item"]')
		.first()
		.trigger('dragstart', { dataTransfer });
	cy.get('[data-testid="constructor-fillings"]').trigger('drop', {
		dataTransfer,
	});
});

Cypress.Commands.add('createOrder', () => {
	cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
		fixture: 'order.json',
	}).as('postOrder');
});
