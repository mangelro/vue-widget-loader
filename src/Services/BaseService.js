import axios from 'axios'
import { endpoints } from './EndpointServices'
import { useAuthStore } from '@stores/AuthStore'
//import crypto from 'crypto'

//const iso8601Regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/i

/**
  Esta expresión regular cubre las siguientes variantes del formato ISO 8601:
	- Fecha básica: `YYYY-MM-DD`
	- Fecha y hora básica: `YYYY-MM-DDThh:mm:ss`
	- Fecha y hora con milisegundos: `YYYY-MM-DDThh:mm:ss.sss`
	- Fecha y hora con zona horaria UTC: `YYYY-MM-DDThh:mm:ss.sssZ`
	- Fecha y hora con zona horaria offset: `YYYY-MM-DDThh:mm:ss+hh:mm`
 */

const iso8601Regex = /^(\d{4})-(\d{2})-(\d{2})([T\s](\d{2}):(\d{2}):(\d{2})(\.\d{3})?(Z|([+-](\d{2}):?(\d{2})))?)?$/i

export class ErrorService extends Error {
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
		this._updated = false
		this._store = useAuthStore()
		this._controller = null
		this._interceptor = null

		axios.defaults.baseURL = endpoints.URL_BASE_API()

		axios.defaults.headers.post['Content-Type'] = 'application/json'

		this.instance = axios.create({
			timeout: 10_000,
			headers: {
				Accept: 'application/json',
				'Accept-Language': 'es',
				
			},
		})

		this.instance.interceptors.request.use(
			config => {
				if (this._store.userAuth?.isAuthenticated ?? false)
					config.headers['Authorization'] = `Bearer ${this._store.userAuth.accessToken}`

				return config
			},
			error => Promise.reject(error)
		)

		this.instance.interceptors.request.use(
			async config => {
				if (config.method === 'get') {
					const secret =import.meta.env.VITE_SECRET_KEY
					const params = Object.fromEntries(Object.entries(config.params).filter(([_, v]) => v !== null));
					const queryString = new URLSearchParams(params).toString();

					const hash = await this._generateHMAC(secret, queryString)
					//
					config.headers['X-Hmac'] = hash
				}

				return config
			},
			error => Promise.reject(error)
		)

		this.instance.defaults.transformResponse.push(this._transformDates)
	}

	async _generateHMAC(key, data) {
		// Convertir la clave secreta y los datos a ArrayBuffers
		const encoder = new TextEncoder()
		const keyData = encoder.encode(key)
		//const jsonData = encoder.encode(JSON.stringify(data));
		const jsonData = encoder.encode(data)

		// Importar la clave para usarla con HMAC
		const cryptoKey = await crypto.subtle.importKey(
			'raw',
			keyData,
			{ name: 'HMAC', hash: { name: 'SHA-256' } },
			false,
			['sign']
		)

		// Generar el HMAC
		const signature = await crypto.subtle.sign('HMAC', cryptoKey, jsonData)

		// Convertir la firma (ArrayBuffer) a una cadena hexadecimal
		const hashArray = Array.from(new Uint8Array(signature))

		
		 const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
		 return hashHex;
	}

	/**
	 * Cancela la petición actual
	 */
	cancelRequest() {
		this._controller?.abort()
	}

	/**
	 *
	 * @param {*} url
	 * @param {*} config
	 * @returns
	 */
	async get(url, config) {
		try {
			this._controller = new AbortController()

			return await this.instance.request({
				method: 'get',
				url,
				signal: this._controller.signal,
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
	useRefreshToken() {
		if (this._interceptor !== null) return

		this._interceptor = this.instance.interceptors.response.use(
			response => response,
			async error => {
				const originalRequest = error.config
				if (error.response.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true

					if (this._store.userAuth?.isAuthenticated ?? false) {
						// Lógica para refrescar el token
						return axios
							.post(endpoints.URL_REFRESH, {
								refreshToken: this._store.userAuth.refreshToken,
								appKey: '91b51999-57cf-4d10-ae10-d632dcce29db',
							})
							.then(res => {
								console.log(
									'Set new refresh token',
									`${this._store.userAuth.refreshToken} => ${res.data.refreshToken}`
								)

								//this._store.userAuth.refreshToken = res.data.refreshToken
								//this._store.userAuth.accessToken = res.data.accessToken

								this._store.userAuth = res.data
								this._updated = true

								// Guarda el nuevo token y reintenta la petición original
								originalRequest.headers['Authorization'] = `Bearer ${this._store.userAuth.accessToken}`

								return axios(originalRequest)
							})
					}
				}

				return Promise.reject(error)
			}
		)
	}

	/*
		MÉTODOS PRIVADOS

	*/

	_onError(e) {
		//if (e.status === 401) throw e

		if (e.response) {
			if (e.response.data) {
				throw new ErrorService(e.response.data.detail, e.request.responseURL)
			} else {
				throw new ErrorService(e.message, e.request.responseURL)
			}
		}

		throw new ErrorService(e.message)
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
				if (obj[key] === null) continue

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
