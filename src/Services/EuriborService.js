import { BaseService } from './BaseService'

class EuriborService extends BaseService {


	/**
	 *
	 * @param {*} id
	 * @param {*} cancellation
	 * @returns
	 */
	async getIndices(query) {
		const r = await super.get('/v1/euribor',{
			params:{
				...query
			}
		})
		return r.data
	}
}

//singleton
export const service = new EuriborService()
