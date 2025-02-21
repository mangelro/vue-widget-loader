import { BaseService, ErrorService } from './BaseService'
import { endpoints } from './EndpointServices'
import { useAuthStore } from '@stores/AuthStore'

class AuthService extends BaseService {
	// Example method to handle user login
	async login(auth) {
		// Implement login logic here
		//console.log('Logging in user', auth)

		try {
			const r = await super.post(endpoints.URL_SIGNIN, auth)

			const store = useAuthStore()
			store.userAuth = r.data

		} catch (e) {
			throw new ErrorService(e.response.data.authMessage, e.request.responseURL)
		}
	}

	// Example method to handle user logout
	logout() {
		// Implement logout logic here
		console.log('Logging out user')
	}

	// Example method to check if user is authenticated
	isAuthenticated() {
		// Implement authentication check logic here
		return false
	}
}

export const service = new AuthService()
