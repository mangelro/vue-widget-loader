<template>
	<article class="border small">
		<h6 class="red-2 tiny-padding">Se ha producido un error</h6>
		<p>{{ ErrorMessage }}</p>
	</article>
</template>
<script setup>
	const props = defineProps({
		ErrorMessage: String,
	})
</script>
