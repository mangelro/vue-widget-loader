<template>
	<the-loader v-if="isValidating && !data"></the-loader>
	<the-error v-else-if="error" :error-message="error.message"></the-error>
	<Transition name="slide-fade" v-else>
		<component :is="AsyncComponent" :data="data"></component>
	</Transition>
	<!--Indicator if data is updating-->
	<the-loader v-if="isValidating && data"></the-loader>
</template>

<script setup>
	//https://www.smashingmagazine.com/2022/11/optimizing-vue-app/
	//name:'WidgetLoader',

	import { defineAsyncComponent } from 'vue'
	import { useLazyFetch } from '@composables/lazyFetch'

	const TheLoader = defineAsyncComponent(() => import('@components/TheLoader.vue'))
	const TheError = defineAsyncComponent(() => import('@components/TheError.vue'))

	const props = defineProps({
		aspectRatio: {
			type: String,
			default: '5 / 3', // define a default value
		},
		url: String,
		importFunction: Function,
	})

	const AsyncComponent = defineAsyncComponent({
		loader: props.importFunction,
		delay: 100,
		timeout: 5_000,
	})

	const { data, isValidating, error } = useLazyFetch(props.url)
</script>
