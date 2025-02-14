import { BaseService } from './BaseService'

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
	async getEspania() {
		const r = await super.get('v1/ipool/espania', {
			params: {
				periodo: '20240101|20241231',
			},
		})
		return r.data
	}

	async getVL1() {
		const r = await super.get('v1/ipool/vl1', {
			params: {
				periodo: '20240101|20241231',
			},
		})
		return r.data
	}
}

//singleton
export const service = new IPoolService()
