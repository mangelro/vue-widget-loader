import { BaseService } from './BaseService'
import {endpoints} from './EndpointServices'


class PreciosService extends BaseService {
	constructor() {
		super()
		//super.useRefreshToken()
	}


	/**
	 *
	 * @param {*} query
	 * @returns
	 */
	async getDensidad(query) {
		const r = await super.get(endpoints.URL_DENSIDAD, {
			params: {
				...query,
			},
		})
		return r.data
	}

	/**
	 * 
	 * @param {*} query 
	 * @returns 
	 */
	async getEvolucion(query) {
		const r = await super.get(endpoints.URL_EVOLUCION, {
			params: {
				...query,
			},
		})
		return r.data
	}
}

//singleton
export const service = new PreciosService()
