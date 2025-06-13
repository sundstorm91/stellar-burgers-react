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

describe('Авторизация через моки', () => {
	const testUser = {
		email: 'test@example.com',
		password: 'test-password',
	};

	beforeEach(() => {
		cy.mockLogin(testUser.email, testUser.password);

		cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
			fixture: 'order.json',
		}).as('postOrder');
	});

	it('Должен успешно авторизоваться', () => {
		cy.url().should('include', '/');
		cy.get('[data-testid="profile-email"]').should('contain', testUser.email);
	});

	it('Должен загрузить ингредиенты', () => {
		cy.wait('@getIngredients');
		cy.get('[data-testid="ingredient-item"]').should('have.length.gt', 0);
	});

	it('Модалка с ингредиентами', () => {
		cy.get('[data-testid="ingredient-item"]').first().click();
		cy.get('[data-testid="ingredient-details"]').should('be.visible');
		cy.get('[data-testid="modal-close-button"]').click();
	});

	it('Должен запрещать добавление небулочных ингредиентов в секции булок', () => {
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

	it('Работа конструктора', () => {
		const dataTransfer = new DataTransfer();

		cy.get('[data-testid="menu-bun"]')
			.find('[data-testid="ingredient-item"]')
			.first()
			.trigger('dragstart', { dataTransfer });

		cy.get('[data-testid="constructor-bun-top"]')
			.trigger('drop', { dataTransfer })
			.should('not.be.empty');

		cy.get('[data-testid="constructor-bun-bottom"]').should('not.be.empty');

		cy.get('[data-testid="menu-sauce"]')
			.find('[data-testid="ingredient-item"]')
			.first()
			.trigger('dragstart', { dataTransfer });
		cy.get('[data-testid="constructor-fillings"]')
			.trigger('drop', { dataTransfer })
			.should('not.be.empty');

		cy.get('[data-testid="menu-main"]')
			.find('[data-testid="ingredient-item"]')
			.first()
			.trigger('dragstart', { dataTransfer });
		cy.get('[data-testid="constructor-fillings"]').trigger('drop', {
			dataTransfer,
		});

		cy.get('[data-testid="constructor-item"]').should('have.length', 2);

		cy.get('[data-testid="create-order-button"]').click();

		cy.get('[data-testid="order-modal"]', { timeout: 15000 })
			.should('be.visible')
			.within(() => {
				cy.contains('идентификатор заказа').should('exist');
				cy.contains('12345').should('exist');
			});
	});
});
