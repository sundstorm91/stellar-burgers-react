describe('Smoke Test', () => {
	it('Загрузка главной страницы..', () => {
		cy.visit('/');
		cy.contains('Соберите бургер').should('be.visible');
		cy.get('[data-testid="menu-bun"]').should('exist');
		cy.get('[data-testid="menu-sauce"]').should('exist');
		cy.get('[data-testid="menu-main"]').should('exist');
		cy.get('[data-testid="constructor-container"]').should('be.visible');
	});
});
