<template>
	<div class="widget" :style="{ 'aspect-ratio': aspectRatio }">
		<component :is="widgetComponent" :data="data" v-bind="$attrs"></component>
		
	</div>
</template>

<script setup>
	/**
	 * Este patrón permite la carga de widgets de forma asíncrona.
	 *
	 * Es muy interesante dividar las páginas en diferentes widgets que
	 * cuya carga no bloquee la carga de dicha página
	 */

	import { ref, defineAsyncComponent, watch } from 'vue'

	const Loader = defineAsyncComponent(() => import('@components/TheLoader.vue'))
	const Error = defineAsyncComponent(() => import('@components/TheError.vue'))

	const data = ref([])



	const loading = ref(true)

	const props = defineProps({
		aspectRatio: {
			type: String,
			default: '16/9', // Los más habituales: 16/9 - 18/9 - 19/9 - 20/9 - 21/9
		},
		component: String, // Nombre del componente a cargar
		dataSource: {
			type: Function,
			default: () => new Promise(resolve => resolve([])),
		},
	})

	const widgetComponent = defineAsyncComponent({
		loader: loadComponent,
		loadingComponent: Loader,
		errorComponent: Error,
		delay: 200,
		timeout: 10_000,
	})

	function loadComponent() {
		
		return props
			.dataSource()
			.then(values => (data.value = values))
			.then(() => import(/* @vite-ignore */`../charts/${props.component}`)) 
			
			.finally(() => (loading.value = false))
	}
</script>
