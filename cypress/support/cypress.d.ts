import './commands';

declare global {
	namespace Cypress {
		interface Chainable {
			mockLogin(email: string, password: string);
		}
	}
}
