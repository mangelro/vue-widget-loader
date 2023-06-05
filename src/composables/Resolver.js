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
	console.error('tryResolve Error ', e)
}

/**
 * Intenta resolver una promesa generada por una función
 * @param {Object} options
 * 	- successNotification: función para notificar de la ejecución correcta
 *  - errorNotification: función para notificar de la ejecución incorrecta.
 * 		Recibe como parámetros el error producido
 * 		Si retorna true se lazará la excepción motivo del error que debaerá ser capturada
 *  - retryDelay: Número de milisegundos entre reintentos. def: 300
 */
export function useResolver(options = {}) {
	const controller = new AbortController()

	const signal = controller.signal

	const { retryDelay = 300 } = options //tiempo de espera entre reintentos

	/**
	 * Se puede establecer de manera global las notificaciones
	 */

	//	Desectructuración con valores por defecto. Si no existe se establecen tambien valores por defecto

	//Desectructuración con valores por defecto. Si no existe se establecen tambien valores por defecto
	//si se desea utilizar dentro de un objeto
	// const {
	// 	notifications: { successNotification = noopSuccess, errorNotification = noopError } = {
	// 		successNotification: noopSuccess,
	// 		errorNotification: noopError,
	// 	},
	// } = options

	const { successNotification = noopSuccess, errorNotification = noopError } = options

	const _notifications = {
		successNotification,
		errorNotification,
		clearSuccessNotification: () => (_notifications.successNotification = noopSuccess),
		clearErrorNotification: () => (_notifications.errorNotification = noopError),
	}
	//
	const isLoading = ref(false)
	const data = ref(null)
	const error = ref(null)

	/**
	 * Intensa resolver una Promesa en un número determinado de veces
	 * @param {Function} queryFn Función factoria de Promises que se desean resolver
	 * @param {Number} retries Número máximo de intentos para resolver la promesa
	 * @returns true si la Promesa se resolvió correctamente, false en cualquier otro caso.
	 */

	const tryResolve = (queryFn, retries) => {

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
					return delay(() => tryResolve(queryFn, retries - 1), retryDelay)
				}
				error.value = e
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
	const cancelResolve = () => controller.abort()

	onBeforeUnmount(() => {
		cancelResolve()
	})

	return {
		isLoading: readonly(isLoading),
		data: readonly(data),
		error: readonly(error),

		//methods
		tryResolve,
		cancelResolve,

		//Se pueden establecen de manera local las notificaciones
		notifications: _notifications,
	}
}