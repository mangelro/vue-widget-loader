<template>
	<the-loader v-if="isLoading && !data"></the-loader>
	<the-error v-else-if="error" :Error-Message="error.message"></the-error>
	<component :is="AsyncComponent" :data="data" v-else></component>
	<!--Indicator if data is updating-->
	<the-loader v-if="isLoading && data"></the-loader>
</template>

<script setup>
	//name:'WidgetLoader',

	import { onMounted, defineAsyncComponent, watch } from 'vue'
	//import { useQuery } from 'vue-query'
	import { useFetcher } from '@composables/Fetcher.js'
	import { useResolver } from '@composables/Resolver.js'

	const TheLoader = defineAsyncComponent(() => import('@components/TheLoader.vue'))
	const TheError = defineAsyncComponent(() => import('@components/TheError.vue'))

	const props = defineProps({
		aspectRatio: {
			type: String,
			default: '16/9', // define a default value
		},
		url: String,
		importFunction: Function,
		fetchOnMounted: {
			//llama al servicio al montar el componente
			type: Boolean,
			default: false,
		},
	})

	const AsyncComponent = defineAsyncComponent({
		loader: props.importFunction,
		delay: 100,
		timeout: 5_000,
	})

	const { tryResolve, data, error, isLoading, cancelResolve } = useResolver()

	let headerAuth = ''
	const { fetcher } = useFetcher({
		url: props.url,
		method: 'GET',
		//body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			//'Access-Control-Allow-Origin':'*', //CORS
		},
		// credentials: 'same-origin',
		// cache: 'default',
		//mode: 'no-cors',
	},
	o => (o.headers['Authorization'] = `Basic ${getAutorization('miguel', 'angel')}`),
	)

	//const { isLoading, data, error } = useQuery(props.url, fetcher)
	onMounted(() => {
		if (props.fetchOnMounted) {
			tryResolve(fetcher, 0)
		}
	})

	function getAutorization(user, pass) {
		return window.btoa(`${user}:${pass}`)
	}

	defineExpose({
		refreshData: () => tryResolve(fetcher, 2),
	})
</script>

<style scoped>
	/*
  Enter and leave animations can use different
  durations and timing functions.
*/
	.slide-fade-enter-active {
		transition: all 0.3s ease-out;
	}

	.slide-fade-leave-active {
		transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
	}

	.slide-fade-enter-from,
	.slide-fade-leave-to {
		transform: translateX(20px);
		opacity: 0;
	}
</style>
