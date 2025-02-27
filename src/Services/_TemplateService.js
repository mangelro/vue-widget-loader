import { BaseService } from './BaseService'
import { endpoints } from './EndpointServices'

class NombreService extends BaseService {
	constructor() {
		super()
	}

	/**
	 *
	 * @param {*} id
	 * @returns
	 */
	async getProduct(query) {
		const r = await super.get(endpoints.URL_ENTIDADES, {
			params: {
				...query,
			},
		})
		return r.data
	}
}

//singleton
export const service = new NombreService()
