<template>
	<div class="page active">
		<button @click="cancel">Cancel</button>
		<h5>AXIOS</h5>

		<div class="field border prefix suffix">
			<progress class="circle" v-if="isLoading"></progress>
			<input type="text" v-if="product" :value="product.reviews[0].date.toLocaleString()" />
			<input type="text" v-else />
		</div>

		<p v-if="product">{{ product }}</p>
	</div>
	<div id="errorToast" class="snackbar error">{{ error }}</div>
</template>

<script setup>
	//name:'App',
	import { ref, defineAsyncComponent, onMounted, onBeforeUnmount } from 'vue'
	import { service } from '@services/productService'
	import { useResolver } from './composables/Resolver'
	//const TheComponent = defineAsyncComponent(() => import('src/components/TheComponent.vue'))

	const props = defineProps({})

	const { tryResolve, cancelResolve, data, isLoading, error } = useResolver({
		cancelSource: service.cancelRequest.bind(service),
		delayRetry: 1500,
		notifications: {
			errorNotification: e => {
				ui('#errorToast', 2000)
			},
		},
	})

	const product = ref()

	// onMounted(async () => {
		
	// 	if (await tryResolve(() => service.getProduct(1), 1)) {
	// 		product.value = data.value
	// 	}
	// 	cancelResolve()
	// })

	async function cancel() {
		
		if (await tryResolve(() => service.getProduct(1), 1)) {
			product.value = data.value
		}

		// try {
		// 	product.value = await
		// } catch (e) {
		// 	error.value = e.message
		// 	ui('#errorToast', 1500)
		// }

		//service.abort()
	}

	onBeforeUnmount(() => {
		cancelResolve()
	})
</script>

<style scoped></style>
