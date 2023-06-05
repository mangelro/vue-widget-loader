import { onBeforeUnmount } from 'vue'
import useSWRV from 'swrv'
import LocalStorageCache from 'swrv/dist/cache/adapters/localStorage'

export function useLazyFetch(url) {
	const controller = new AbortController()

	const fetchData = () => {
		return fetch(url, { signal: controller.signal })
			.then(response => response.json())
			.then(response => (data.value = response))
			.catch(e => (error.value = e))
	}

	const { data, isValidating, error } = useSWRV(url, fetchData, {
		revalidateOnFocus: false,
		cache: new LocalStorageCache('swrv'),
		shouldRetryOnError: false,
	})

	onBeforeUnmount(() => controller.abort())

	return {
		isValidating,
		data,
		error,
	}
}
