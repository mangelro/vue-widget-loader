import { BaseService } from './BaseService'
import { endpoints } from './EndpointServices'

class EntidadesService extends BaseService {
	constructor() {
		super()
	}

	/**
	 *
	 * @param {*} id
	 * @returns
	 */
	async get(query) {
		const r = await super.get(endpoints.URL_ENTIDADES, {
			params: {
				...query,
			},
		})
		return r.data
	}
}

//singleton
export const service = new EntidadesService()
