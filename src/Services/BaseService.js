import axios from 'axios'

const iso8601Regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/i

class ErrorService extends Error {
	constructor(message, resource) {
		super(message)
		this.resource = resource
	}
}

export class BaseService {
	/**
	 * Valores por defecto
	 */
	constructor() {
		this.controller = null

		const AUTH_TOKEN = 'Bearer'

		axios.defaults.baseURL = 'https://dummyjson.com'
		axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
		axios.defaults.headers.post['Content-Type'] = 'application/json'

		this.instance = axios.create({
			timeout: 1000,
			headers: {
				Accept: 'application/json',
				'Accept-Language': 'es',
			},
		})

		this.instance.defaults.transformResponse.push(this._transformDates)
	}

	/**
	 * Cancela la petición actual
	 */
	cancelRequest() {
		this.controller?.abort()
	}

	/**
	 *
	 * @param {*} url
	 * @param {*} config
	 * @returns
	 */
	async get(url, config) {
		try {
			this.controller = new AbortController()

			return await this.instance.request({
				method: 'get',
				url,
				signal: this.controller.signal,
				...config,
			})
		} catch (e) {
			this._onError(e)
		}
	}

	/**
	 *
	 * @param {*} url
	 * @param {*} data
	 * @param {*} config
	 * @returns
	 */
	async post(url, data, config) {
		try {
			return await this.instance.request({
				method: 'post',
				url,
				data,
				...config,
			})
		} catch (e) {
			this._onError(e)
		}
	}

	/**
	 *
	 * @param {*} url
	 * @param {*} data
	 * @param {*} config
	 * @returns
	 */
	async put(url, data, config) {
		try {
			return await this.instance.request({
				method: 'put',
				url,
				data,
				...config,
			})
		} catch (e) {
			this._onError(e)
		}
	}

	/**
	 *
	 * @param {*} url
	 * @param {*} config
	 * @returns
	 */
	async delete(url, config) {
		try {
			return await this.instance.request({
				method: 'delete',
				url,
				...config,
			})
		} catch (e) {
			this._onError(e)
		}
	}

	/**
	 * Verificar si la respueta denegada en por expiración del token y pasar el de referesco!!!
	 */
	_useRefreshToken() {
		this.client.interceptors.response.use(
			response => response,
			async error => {
				const { config, response } = error

				// if (config.url !== endpoints.URL_SIGNIN && response) {
				// 	if (authUserStore === null) authUserStore = useAuthUserStore()

				// 	//se trata de un error 401 -
				// 	if (response.status === 401 && !config._retry) {
				// 		config._retry = true
				// 		try {
				// 			const internalClient = axios.create()

				// 			const rs = await internalClient.post(endpoints.URL_REFRESH, {
				// 				accessToken: authUserStore.accessToken,
				// 				refreshToken: authUserStore.refreshToken,
				// 			})

				// 			const { accessToken, refreshToken } = rs.data

				// 			authUserStore.setAccessToken(accessToken, refreshToken)

				// 			config.headers.Authorization = `Bearer ${authUserStore.accessToken}`

				// 			return this.client(config)
				// 			//return config
				// 		} catch (_error) {
				// 			console.error('error interno', _error)
				// 			return Promise.reject(_error)
				// 		}
				//	}
				//}

				return Promise.reject(error)
			}
		)
	}

	/*
		MÉTODOS PRIVADOS

	*/

	_onError(e) {
		if (e.response) {
			if (e.response.data) {
				throw new ErrorService(e.response.data.message, e.request.responseURL)
			} else {
				throw new ErrorService(e.response, e.request.responseURL)
			}
		}

		throw new ErrorService(e.message, e.request.responseURL)
	}

	/**
	 *	Se ejecuta tras los transformadores de JSON y transforman
	 *	las fechas, en formato cadena a objetos Date
	 * @param {*} data
	 * @param {*} headers
	 */
	_transformDates(obj) {
		function recursiveDateTransform(obj) {
			for (const key of Object.keys(obj)) {
				if (typeof obj[key] === 'string' && iso8601Regex.test(obj[key])) {
					obj[key] = new Date(obj[key])
				} else if (typeof obj[key] === 'object') {
					if (Array.isArray(obj[key])) {
						obj[key].forEach(i => recursiveDateTransform(obj[key]))
					} else {
						recursiveDateTransform(obj[key])
					}
				}
			}
		}

		recursiveDateTransform(obj)
		return obj
	}
}
