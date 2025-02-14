export const endpoints = Object.freeze({
	URL_BASE_API: () => {
		if (import.meta.env.DEV) {
			return 'https://localhost:7133'
		} else {
			return 'https://localhost:7133'
		}
	},

	//Auth service
	URL_SIGNIN: '/v1/auth/signin',
	URL_SIGNUP: '/v1/auth/signup',
	URL_REFRESH: '/v1/auth/refresh',


	//Gráf. Densidad
	URL_DENSIDAD:'/v1/precios/densidad',

	//Gráf. Evolucion
	URL_EVOLUCION:'/v1/precios/evolucion',

})
