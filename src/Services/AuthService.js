
import {baseService} from './BaseService'

class AuthService extends baseService {
	constructor() {
	}


	// Example method to handle user login
	login(username, password) {
		// Implement login logic here
		console.log(`Logging in user: ${username}`);
		
		super.post('/v1/auth/signin',
		{
			accountName:username,
			password,
			appId: "962d4613-0e47-493f-ac72-20d4acb3ee6a"
		})
	}

	// Example method to handle user logout
	logout() {
		// Implement logout logic here
		console.log('Logging out user');
	}

	// Example method to check if user is authenticated
	isAuthenticated() {
		// Implement authentication check logic here
		return false;
	}
}

export const service= new AuthService();