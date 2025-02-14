<template>
	<div class="grid">
		<article class="s12 m12 l4">
			<div class="row">
				<i>euro</i>
				<h6>Gráfico de densidad AOVE</h6>
			</div>
			<ChartWidgetLoader
				component="DensidadChart.vue"
				:data-source="datosDensidadAOVE"
				title="Gráf. Densidad AOVE"
				theme="minimalist"
				series-color="#85CC1D"
				aspect-ratio="16/9"
			></ChartWidgetLoader>
			<p class="small-text">{{ timestamp }}</p>
		</article>

		<article class="s12 m12 l4">
			<div class="row">
				<i>euro</i>
				<h6>Gráfico de densidad AOV</h6>
			</div>
			<ChartWidgetLoader
				component="DensidadChart.vue"
				:data-source="datosDensidadAOV"
				title="Gráf. Densidad AOV"
				theme="minimalist"
				series-color="#E7D21F"
				aspect-ratio="16/9"
			></ChartWidgetLoader>
			<p class="small-text">{{ timestamp }}</p>
		</article>

		<article class="s12 m12 l4">
			<div class="row">
				<i>euro</i>
				<h6>Gráfico de densidad AOL</h6>
			</div>
			<ChartWidgetLoader
				component="DensidadChart.vue"
				:data-source="datosDensidadAOL"
				title="Gráf. Densidad AOL"
				theme="minimalist"
				series-color="#C45949"
				aspect-ratio="16/9"
			></ChartWidgetLoader>
			<p class="small-text">{{ timestamp }}</p>
		</article>
	</div>
</template>

<script setup>
	//name:'Precios',
	import { ref, defineAsyncComponent, onMounted } from 'vue'
	import { service } from '@services/PreciosService'

	const ChartWidgetLoader = defineAsyncComponent(() => import('@components/loaders/ChartWidgetLoader.vue'))

	const props = defineProps({})

	const timestamp = ref('')

	const datosDensidadAOVE = () =>
		service
			.getDensidad({
				periodo: '20230101|20231031',
				calidad: 'AOVE',
			})
			.then(data => {
				timestamp.value = data.timestamp.toLocaleString('es-ES', { timeZone: 'UTC', separator: '-' })

				return data.result
			})

	const datosDensidadAOV = () =>
		service
			.getDensidad({
				periodo: '20230101|20231031',
				calidad: 'AOV',
			})
			.then(data => {
				timestamp.value = data.timestamp.toLocaleString('es-ES', { timeZone: 'UTC', separator: '-' })

				return data.result
			})

	const datosDensidadAOL = () =>
		service
			.getDensidad({
				periodo: '20230101|20231031',
				calidad: 'AOL',
			})
			.then(data => {
				timestamp.value = data.timestamp.toLocaleString('es-ES', { timeZone: 'UTC', separator: '-' })

				return data.result
			})
</script>

<style scoped></style>
