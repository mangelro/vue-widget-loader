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
	URL_DENSIDAD: '/v1/precios/densidad',
	//Gráf. Evolucion
	URL_EVOLUCION: '/v1/precios/evolucion',

	//Gráf. iPool
	URL_IPOOL_ESPANIA: 'v1/ipool/espania',
	//Gráf. VL1
	URL_IPOOL_VL1: 'v1/ipool/vl1',
	//Gráf. iPool
	URL_IPOOL_EXTRA: 'v1/ipool/extra',
	//Gráf. iPool
	URL_IPOOL_VIRGEN: 'v1/ipool/virgen',

	URL_PRECIOS_MEDIOS: '/v1/precios/medios',

	URL_OPERACIONES:'/v1/operaciones',

	URL_ENTIDADES: '/v1/entidades',
})
