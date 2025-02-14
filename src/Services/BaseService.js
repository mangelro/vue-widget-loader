import axios from 'axios'
import {endpoints} from './EndpointServices'



//const iso8601Regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/i


/**
  Esta expresión regular cubre las siguientes variantes del formato ISO 8601:
	- Fecha básica: `YYYY-MM-DD`
	- Fecha y hora básica: `YYYY-MM-DDThh:mm:ss`
	- Fecha y hora con milisegundos: `YYYY-MM-DDThh:mm:ss.sss`
	- Fecha y hora con zona horaria UTC: `YYYY-MM-DDThh:mm:ss.sssZ`
	- Fecha y hora con zona horaria offset: `YYYY-MM-DDThh:mm:ss+hh:mm`
 */

const iso8601Regex=/^(\d{4})-(\d{2})-(\d{2})([T\s](\d{2}):(\d{2}):(\d{2})(\.\d{3})?(Z|([+-](\d{2}):?(\d{2})))?)?$/i

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
		this.interceptor = null

		this.AUTH_TOKEN =
			'eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIiwiY3R5IjoiSldUIn0.qbsstZh_ccVtPXE57Mj-PbmZihaVexOUT4eWco3BFDtYPqP2IeEmLQ.Mg8SpYFHD5paMYALFuRiEA.aGgErV-NSBL_pPwOsc8zp3tObvGvJuvdhLMFEqPK57wY_NvVHV9QyxnLxoA8i4NTlftp-Qfy8X_NvG5436LEQcYk9biEWJvHyewTvEsWOSXjH5Pk1RU6jVUOx0-NialhID0OHyQVj9a4lo2GwboKlgSmV1cI1_5nMX_Q4yRh3gtPcYJMvuklnw_TxMmqOHFm36It4WfR2D8jLj5zlZnCtnj5jBSLqb1j5ZCG11f5nJFjnZGqbrQgJJpy0LHmXR57orpvY7keSqbgK-2DPpA9iC2qL_IoPD1K95SHV6hLmBP3CTqIUoAsJl4ATPYDnBysZ1GnMceTxM4sRXPEpqcanTCmpO9DAkWa9CCRsNEjYytgbLo_55Bqa8FYfNRqXuXvdzIIbi0vNUJcY2I6lCZT7SVoqRNxNoGwV2OI1uY-RqXjOT3fbPVTzfzSdUjczI_q1zOlM1mQvfe9-1Jjkl9kgGNhtVVsUX6CScONkUQVQY_QyPGAca75IdTe6Kxs0Gq6N1dWSb6bxb6VOb-k4XzogaYQEFxkvhvs2pm1C0OMpecURCXMz29vhXnURrikM26sCNw2r9WtdG7ewKZsMQCW7o0pwJOT7sfVRcyyfkWdA3eaVPMDJioSFaNUXJOdLG4aM4HvxRp3jIC9hefs2SlMwHukI2fCwjH6N0mdKcs3VEmGcpaG_-znhMlyXZDjeAPF4vTBKKsi8DHoIq0ibTBM71rwQRDGX5slEnR24ZXON85mzLPoSNJV7QM3Hk_ruMY4.OoRwJMJZJt00LkIUWay_aw'
		this.REFRESH_TOKEN = '994a3e0c313d4461a5ca6bd081a1cb26'
		axios.defaults.baseURL = endpoints.URL_BASE_API()
		axios.defaults.headers.common['Authorization'] = `Bearer ${this.AUTH_TOKEN}`
		axios.defaults.headers.post['Content-Type'] = 'application/json'

		this.instance = axios.create({
			timeout: 10_000,
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
	useRefreshToken() {
		if (this.interceptor !== null) return

		this.interceptor = this.instance.interceptors.response.use(
			response => response,
			async error => {
				const originalRequest = error.config

				if (error.response.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true
					// Lógica para refrescar el token
					return axios
						.post(endpoints.URL_REFRESH, {
							refreshToken: this.REFRESH_TOKEN,
							appKey: '91b51999-57cf-4d10-ae10-d632dcce29db',
						})
						.then(res => {
							this.AUTH_TOKEN = res.data.accessToken
							this.REFRESH_TOKEN= res.data.refreshToken

							// Guarda el nuevo token y reintenta la petición original
							originalRequest.headers['Authorization'] = `Bearer ${this.AUTH_TOKEN}` 
							return axios(originalRequest)
						})
				}

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
