import { onBeforeUnmount } from 'vue'
/*
	Configura la peticion de datos JSON

		401 Unauthorized

		403 Prohibido
*/

/**
 * https://javascript.info/custom-errors
 */
class FetchError extends Error {
	constructor(message, response) {
		super(message)
		this.response = response
	}
}

const _onAuthorizedFail = o => console.log('401 - AuthenticateFail')

/**
 * Composable para consultar datos JSON de unservicio REST
 * @param {*} args
 * @returns
 */
export function useFetcher(...args) {

	
	const { url = args, ...options } = args[0]

	const onAuthorizedError = args[1] ?? _onAuthorizedFail

	const _controller = new AbortController()

	options['signal'] = _controller.signal

	const fetchData = () =>{

		return new Promise((resolve,reject) => {
			setTimeout(() => {
					fetch(url, options)
					.then(_proccessJsonResponse)
					.then(resolve)
					.catch(reject)		
			}, getRandomInt(3000, 10000))
		})

		//return fetch(url, options).then(_proccessJsonResponse).catch(_processError)
	} 
	
	const getRandomInt=(min, max) =>{
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}




	const _proccessJsonResponse = response => {
		if (response.ok) {
			return response.json()
		} else {
			//Hay que establecer como se consumen los errores desde el servicio: statusText, json...
			return response
				.json()
				.then(json => {
					throw new FetchError(json.message, response)
				})
				.catch(e => {
					if (e instanceof FetchError) throw e
					else throw new FetchError('Fetch Error@', response)
				})
		}
	}

	const _processError = error => {
		if (error instanceof FetchError && error.response.status === 401) {
			onAuthorizedError(options)
		}
		throw error
	}

	const _aborting = () => {
		console.log('Fetch aborted')
		_controller.abort()
	}

	onBeforeUnmount(() => {
		_aborting()
	})

	return {
		fetcher: fetchData,
		cancelFetch: _aborting,
	}
}
