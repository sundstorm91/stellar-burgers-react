import './commands';

declare global {
	namespace Cypress {
		interface Chainable {
			mockLoginWithAuthorization(email: string, password: string);
			createOrder();
			fillConstructor();
		}
	}
}
