/**
 * Aplaza la ejecución de una función que puede ser cacelada
 * @param {*} fn
 * @returns
 */

export function useCanceler(fn, wait = 3_000) {
	let timer = null

	/**
	 * 
	 * @returns 
	 */
	function doCommand(/* ...args */) {
		const args = arguments

		const later = args => {
			timer = null
			return fn.apply(this, [...args])
		}

		if (timer !== null) {
			clearTimeout(timer)
		}

		return new Promise(resolve => {
			timer = setTimeout(() => resolve(later([...args])), wait)
		})
	}

	/**
	 * Cancela la ejecucuón del función pendiente
	 */
	const cancelCommand = () => {
		if (timer !== null) {
			clearTimeout(timer)
		}
	}

	return {
		doCommand,
		cancelCommand,
	}
}
