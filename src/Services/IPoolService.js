import { BaseService } from './BaseService'
import { endpoints } from './EndpointServices'

class IPoolService extends BaseService {
	constructor() {
		super()
		super.useRefreshToken()
	}


	/**
	 *
	 * @param {*} id
	 * @returns
	 */
	async getEspania(query) {
		const r = await super.get(endpoints.URL_IPOOL_ESPANIA, {
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
	async getVL1(query) {
		const r = await super.get(endpoints.URL_IPOOL_VL1, {
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
	async getExtra(query) {
		const r = await super.get(endpoints.URL_IPOOL_EXTRA, {
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
	async getVirgen(query) {
		const r = await super.get(endpoints.URL_IPOOL_VIRGEN, {
			params: {
				...query,
			},
		})
		return r.data
	}
}

//singleton
export const service = new IPoolService()
