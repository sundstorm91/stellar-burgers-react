describe('Application', () => {
	const testUser = {
		email: 'test@example.com',
		password: 'test-password',
	};

	beforeEach(() => {
		cy.mockLoginWithAuthorization(testUser.email, testUser.password);
		cy.createOrder();
	});

	it('user should successfully login..', () => {
		cy.url().should('include', '/');
		cy.get('[data-testid="profile-email"]').should('contain', testUser.email);
	});

	it('ingredients should successfully fetched..', () => {
		cy.wait('@getIngredients');
		cy.get('[data-testid="ingredient-item"]').should('have.length.gt', 0);
	});

	it('modal window should successfully opened..', () => {
		cy.get('[data-testid="ingredient-item"]').first().click();
		cy.get('[data-testid="ingredient-details"]').should('be.visible');
		cy.get('[data-testid="ingredient-name"]').should('not.be.empty');
		cy.get('[data-testid="ingredient-proteins"]').should('not.be.empty');
		cy.get('[data-testid="ingredient-fat"]').should('not.be.empty');
		cy.get('[data-testid="ingredient-carbohydrates"]').should('not.be.empty');
		cy.get('[data-testid="ingredient-calories"]').should('not.be.empty');
		cy.get('[data-testid="modal-close-button"]').click();
	});

	it('an ingredient that is not part of the bun type should not be placed in the bun section..', () => {
		const dataTransfer = new DataTransfer();

		cy.get('[data-testid="menu-sauce"]')
			.find('[data-testid="ingredient-item"]')
			.first()
			.trigger('dragstart', { dataTransfer });

		cy.get('[data-testid="constructor-bun-top"]').trigger('drop', {
			dataTransfer,
		});

		cy.get('[data-testid="constructor-bun-top"]').should('not.contain', 'Соус');
	});

	it('user should successfully add ingredients to constructor..', () => {
		cy.fillConstructor();

		cy.get('[data-testid="constructor-bun-top"]').should('not.be.empty');
		cy.get('[data-testid="constructor-bun-bottom"]').should('not.be.empty');
		cy.get(
			'[data-testid="constructor-fillings"] [data-testid="constructor-item"]'
		).should('have.length', 2);
	});

	it('user should receive message about successfully creation of the order..', () => {
		cy.fillConstructor();
		cy.get('[data-testid="create-order-button"]').click();

		cy.get('[data-testid="order-modal"]', { timeout: 15000 })
			.should('be.visible')
			.within(() => {
				cy.contains('идентификатор заказа').should('exist');
				cy.contains('12345').should('exist');
			});
		cy.get('[data-testid="modal-close-button"]').click();
	});
});
