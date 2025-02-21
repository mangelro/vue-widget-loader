import { BaseService } from './BaseService'
import { endpoints } from './EndpointServices'

class OperacionesService extends BaseService {
	constructor() {
		super()
	}

	/**
	 *
	 * @param {*} id
	 * @returns
	 */
	async getOperaciones(query,id) {

		// let url=endpoints.URL_OPERACIONES

		// if (id) {
		// 	url += `/vendedores/${id}`
		// }	



		const r = await super.get(endpoints.URL_OPERACIONES, {
			params: {
				...query,
			},
		})
		return r.data
	}
}

//singleton
export const service = new OperacionesService()
