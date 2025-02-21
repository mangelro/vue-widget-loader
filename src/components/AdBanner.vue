<template>
	<div>
		<img :src="banners[bannerId]" width="100%" class="responsive"/>
	</div>
</template>

<script setup>
	//name:'AdBanner',
	import { ref, defineAsyncComponent } from 'vue'

	const banners = [
		'https://www.poolred.com/Imagenes/bannerPieralisi_630x65px.png',
		'https://www.poolred.com/imagenes/kubota.jpg',
		'https://www.poolred.com/imagenes/Foss.gif'
	]

	//const TheComponent = defineAsyncComponent(() => import('src/components/TheComponent.vue'))

	const props = defineProps({
		bannerId: Number,
		aspectRatio: {
			type: String,
			default: '1/1', // Los más habituales: 16/9 - 18/9 - 19/9 - 20/9 - 21/9
		},
	})
</script>

<style scoped></style>
