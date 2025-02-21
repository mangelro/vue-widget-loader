<template>
	<article class="border small error">
		<!-- <h6 class="red-2 tiny-padding">Se ha producido un error</h6> -->
		<h6>{{ errorMessage }}</h6>
	</article>
</template>



<script setup>
	const props = defineProps({
		errorMessage: { type: String, default: 'Ha ocurrido un error' },
	})
</script>
