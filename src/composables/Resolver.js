/******
 *
 *
 *
 * V 1.1
 */

'use strict'

import { ref, onBeforeUnmount, readonly } from 'vue'

/**
 * Resuelve la funcion
 * @param {Funcion} fn Funcion generadora
 * @param {*} ms Tiempo de espera
 * @returns
 */
const delay = (fn, ms) => new Promise(resolve => setTimeout(() => resolve(fn()), ms))

const noopSuccess = () => {
	console.log('tryResolve Success')
}

const noopError = e => {
	//throw e
	console.error('tryResolve Error ', e)
}

/**
 * Intenta resolver una promesa generada por una función
 * @param {Object} param0
 *  - notifications:
 * 		- successNotification: función para notificar de la ejecución correcta
 *  	- errorNotification: función para notificar de la ejecución incorrecta.
 * 			Recibe como parámetros el error producido y una indicación de si el usuario canceló
 * 			la ejecución antes de su final.
 * 			Si retorna true se lazará la excepción motivo del error que debaerá ser capturada
 *  - delayRetry: Número de milisegundos entre reintentos. def: 300
 *  - cancelSource: Método, si existe del origen de datos para cancelar la peitición
 * 			Existe un problema con el contexto de this en el origen de datos y toma this como el
 * 			objeto options para solucionalo hay que forzar el contexto con bind: service.cancelRequest.bind(service),
 *
 * 	USO:
 * 		const { tryResolve, cancelResolve, data, isLoading, error } = useResolver({
 *			cancelSource: service.cancelRequest.bind(service),
 *			delayRetry: 1500,
 *			notifications: {
 *				errorNotification: e => {
 *					ui('#errorToast', 2000)
 *				},
 *			},
 *		})
 *
 */
export function useResolver(options = {}) {
	const controller = new AbortController()
	const signal = controller.signal

	const { delayRetry = 500 } = options //tiempo de espera entre reintentos

	/*
	 * Se puede establecer de manera global las notificaciones
	 */

	//Desectructuración con valores por defecto. Si no existe se establecen tambien valores por defecto
	const {
		notifications: { successNotification = noopSuccess, errorNotification = noopError } = {
			successNotification: noopSuccess,
			errorNotification: noopError,
		},
	} = options

	const _notifications = {
		successNotification,
		errorNotification,
		clearSuccessNotification: () => (_notifications.successNotification = noopSuccess),
		clearErrorNotification: () => (_notifications.errorNotification = noopError),
	}

	const isLoading = ref(false)
	const data = ref(null)
	const error = ref(null)

	/**
	 * Intensa resolver una Promesa en un número determinado de veces
	 * @param {Function} queryFn Función factoria de Promises que se desean resolver
	 * @param {Number} retries Número máximo de intentos para resolver la promesa
	 * @returns true si la Promesa se resolvió correctamente, false en cualquier otro caso.
	 */
	const tryResolve = (queryFn, retries = 0) => {
		if (typeof queryFn !== 'function') throw new Error('First argument must by a factory function')

		isLoading.value = true
		error.value = null

		return queryFn()
			.then(r => {
				data.value = r
				error.value = null
				_notifications.successNotification()
				return true
			})
			.catch(e => {
				if (retries > 0 && !signal.aborted) {
					console.warn('Reintentado...', retries)
					return delay(() => tryResolve(queryFn, retries - 1), delayRetry)
				}

				error.value = e.message
				data.value = null

				//Si la función de notificación retorna true se lanza la excepción
				// que debería ser capturada en el await de la llamada al tryResolve
				if (_notifications.errorNotification(e)) throw e
				return false
			})
			.finally(() => {
				isLoading.value = false
			})
	}

	/**
	 * Emite la señal para intentar cancelar la ejecución la promesa
	 * @returns
	 */
	const cancelResolve = () => {
		controller.abort()
		if (options.cancelSource) options.cancelSource()
	}

	onBeforeUnmount(() => {
		cancelResolve()
	})

	return {
		isLoading: readonly(isLoading),
		data: readonly(data),
		error: readonly(error),
		//cancellationPending: readonly(cancellationPending),

		//methods
		tryResolve,
		cancelResolve,

		//Se pueden establecer de manera local las notificaciones
		notifications: _notifications,
	}
}
