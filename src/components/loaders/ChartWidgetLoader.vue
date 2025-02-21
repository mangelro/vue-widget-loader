<table></table>
<template>
	<div class="widget" :style="{ 'aspect-ratio': aspectRatio }">
		<TheLoader v-if="loading && !data"></TheLoader>
		<TheError v-else-if="error" :error-message="error"></TheError>
		<component :is="widgetComponent" :data="data" v-bind="$attrs" v-else></component>
	</div>
</template>

<script setup>
	/**
	 * Este patrón permite la carga de widgets de forma asíncrona.
	 *
	 * Es muy interesante dividar las páginas en diferentes widgets que
	 * cuya carga no bloquee la carga de dicha página
	 */

	import { ref, defineAsyncComponent,  onMounted } from 'vue'

	const TheLoader = defineAsyncComponent(() => import('@components/TheLoader.vue'))
	const TheError = defineAsyncComponent(() => import('@components/TheError.vue'))

	defineOptions({
		inheritAttrs: false,
	})


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

	const data = ref()
	const error = ref()
	const loading = ref(true)

	//watch(error, () => console.log('Error en cargador', error.value))

	const widgetComponent = defineAsyncComponent({
		loader: () => import(/* @vite-ignore */ `../charts/${props.component}`),
		delay: 200,
		timeout: 10_000,
	})

	onMounted(() => {
		
		loadComponent()
	})

	function loadComponent() {
		props
			.dataSource()
			.then(v => (data.value = v))
			//.then(() => import(/* @vite-ignore */`../charts/${props.component}`))
			.catch(e => (error.value = e.message))
			.finally(() => (loading.value = false))
	}


	defineExpose({
		reloadData: () =>{
			data.value = null
			loading.value = true
			loadComponent()
			
		},
	})
</script>
