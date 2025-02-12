import { BaseService } from './BaseService'

class ProductService extends BaseService {

	/**
	 *
	 * @param {*} id
	 * @param {*} cancellation
	 * @returns
	 */
	async getProduct(id) {
		const r = await super.get(`/products/${id}`)
		return r.data
	}
}

//singleton
export const service = new ProductService()
