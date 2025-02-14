<template>
	<div class="grid">
		<article class="s12 m12 l6">
			<div class="row">
				<i>euro</i>
				<h6>Gráfico de Evolución</h6>
			</div>
			<ChartWidgetLoader
				component="EvolucionChart.vue"
				:data-source="datosEvolucion"
				title="Gráf. Evolucion"
				theme="minimalist"
				:series-color="['#85CC1D','#E7D21F','#C45949','#FF0000']"
				:series-name="['AOVE','AOV','AOL','Cantidad']"
				aspect-ratio="10/9"
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

	const datosEvolucionAOVE = () =>
		service
			.getEvolucion({
				periodo: '20240101|20240131',
				calidad: 'AOVE',
			})
			.then(data => {
				timestamp.value = data.timestamp.toLocaleString('es-ES', { timeZone: 'UTC', separator: '-' })
				return data.result
			})

	const datosEvolucionAOV = () =>
		service
			.getEvolucion({
				periodo: '20240101|20240131',
				calidad: 'AOV',
			})
			.then(data => {
				return data.result
			})

	const datosEvolucionAOL = () =>
		service
			.getEvolucion({
				periodo: '20240101|20240131',
				calidad: 'AOL',
			})
			.then(data => {
				return data.result
			})

	const datosEvolucion = () => {
		return Promise.all([datosEvolucionAOVE(), datosEvolucionAOV(), datosEvolucionAOL()]).then(values => {
			const length = values[0].length

			const result = []
			for (let i = 0; i < length; i++) {
				result.push({
					fecha:values[0][i].fecha,
					aove: values[0][i].precioMedio,
					aov: values[1][i].precioMedio,
					aol: values[2][i].precioMedio,
					cantidad: Round(values[0][i].cantidad + values[1][i].cantidad + values[2][i].cantidad, 2),
				})
			}

			return result
		})
	}

	// onMounted(async () => {
	// 	const p = await datosEvolucion()
	// 	console.log(p)
	// })

	function Round(value, decimal) {
		return Number(Math.round(value + 'e' + decimal) + 'e-' + decimal)
	}
</script>

<style scoped></style>
