/**
 * Retrasa la ejecución
 *
 * @param {Number} interval Milisegundos
 * @returns
 */
const wait = interval => new Promise(resolve => setTimeout(resolve, interval))

/**
 * Ejecuta una función en un intervalo determinado
 *
 * @param {Function} fn
 * @param {Number} interval Milisegundos
 * @returns
 */
const delay = (fn, interval) => new Promise(resolve => setTimeout(() => resolve(fn()), interval))

/**
 *	Ejecuta una función a intervalos regulares
 *
 * @param {Function} fn
 * @param {Number} interval Milisegundos
 * @returns
 */
const timer = (fn, interval) => {
	const hnd = setInterval(fn, interval)
	return () => clearInterval(hnd)
}

/**
 * Memoiza el resultado de una función (https://es.wikipedia.org/wiki/Memoizaci%C3%B3n)
 *
 * @param {Funtion} fn Función para la generación de resultados
 * @returns
 */
const memoize = function (fn) {
	const cache = {}
	return (...args) => {
		const stringifiedArgs = JSON.stringify(args)
		return (cache[stringifiedArgs] =
			typeof cache[stringifiedArgs] === 'undefined' ? fn(...args) : cache[stringifiedArgs])
	}
}

/**
 * Memoiza el resultado de una función durante un periodo de tiempo,
 * independientemente del número de llamadas que se realice a la función retorna
 * el resultado memoizado
 *
 * @param {Function} fn Función para la generación de resultados
 * @param {Number} interval Milisegundos de validéz del resultado memoizado
 * @returns
 */
const memoizeInterval = function (fn, interval) {
	let timestamp = 0
	let result = null

	return function (...args) {
		if (Date.now() - timestamp > interval) {
			timestamp = Date.now()
			result = fn(...args)
		}
		return result
	}
}

export { wait, delay, timer, memoize, memoizeInterval }
