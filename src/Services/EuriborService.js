import { BaseService } from './BaseService'

class EuriborService extends BaseService {


	/**
	 *
	 * @param {*} id
	 * @param {*} cancellation
	 * @returns
	 */
	async getIndices() {
		const r = await super.get('/v1/euribor',{
			params:{
				periodo:'202401|202412'
			}
		})
		return r.data
	}
}

//singleton
export const service = new EuriborService()
