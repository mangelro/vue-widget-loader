<template>
	<article class="s12 m12 l4" v-if="data" >
		<h6>Usuarios conectados</h6>
		<p v-for="{ id, nombreEntidad, poblacion } in data.items" :key="id">{{ `${nombreEntidad} (${poblacion})` }}</p>
	</article>
	<div id="errorToast" class="snackbar error">{{ error }}</div>
</template>

<script setup>
	//name:'UserConnected',
	import { ref, onMounted } from 'vue'
	import { useResolver } from '@composables/Resolver'
	import { service } from '@services/EntidadesService'

	const { tryResolve, data, error } = useResolver({
		notifications: {
			errorNotification: e => {
				ui('#errorToast', 2000)
			},
		},
	})

	onMounted(() => {
		tryResolve(() =>
			service.get({
				paged: '1|10',
				onlyonline: true,
				orderby: 'nombreentidad',
				order: 'asc',
			})
		)
	})
</script>

<style scoped></style>
