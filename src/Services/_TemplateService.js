import { BaseService } from './BaseService'
import {endpoints} from './EndpointServices'


class NombreService extends BaseService {

	constructor(){
		super()
	}

	/**
	 *
	 * @param {*} id
	 * @returns
	 */
	async getProduct(id) {
		const r = await super.get(`/products/${id}`)
		return r.data
	}
}

//singleton
export const service = new NombreService()
