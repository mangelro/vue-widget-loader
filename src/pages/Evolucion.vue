<template>
	<div class="grid">
		<article class="s12 m12 l6">
			<DateRange v-model="periodo"></DateRange>
		</article>
		<article class="s12 m12 l12">
			<div class="row">
				<i>euro</i>
				<h6 class="max">Gráfico de Evolución</h6>
				<button class="chip round">
					<i class="primary-text">today</i>
					<span>{{ periodo }}</span>
				</button>
				<!-- <button class="circle" @click="refreshData">
					<i>refresh</i>
				</button> -->
			</div>
			<ChartWidgetLoader
				:key
				component="EvolucionChart.vue"
				:data-source="datosEvolucion"
				title="Gráf. Evolucion"
				theme="minimalist"
				:series-color="['#6cb304', '#e7d21f', '#ab4030', '#CECECE']"
				:series-name="['AOVE', 'AOV', 'AOL', 'Cantidad']"
				aspect-ratio="16/9"
				ref="chartLoader"
			></ChartWidgetLoader>
			<p class="small-text">{{ timestamp }}</p>
		</article>
	</div>
</template>

<script setup>
	//name:'Precios',
	import { ref, defineAsyncComponent, watch, useTemplateRef } from 'vue'
	import { service } from '@services/PreciosService'

	const ChartWidgetLoader = defineAsyncComponent(() => import('@components/loaders/ChartWidgetLoader.vue'))
	const DateRange = defineAsyncComponent(() => import('@components/DateRange.vue'))

	const timestamp = ref('')

	const chartLoader = useTemplateRef('chartLoader')
	const periodo = ref('20250101|20250219')

	watch(periodo, newValue => {
		console.log('periodo', newValue)
	})

	const datosEvolucionAOVE = () =>
		service
			.getEvolucion({
				periodo: periodo.value,
				calidad: 'AOVE',
			})
			.then(data => {
				timestamp.value = data.timestamp.toLocaleString('es-ES', { timeZone: 'UTC', separator: '-' })
				return data.result
			})

	const datosEvolucionAOV = () =>
		service
			.getEvolucion({
				periodo: periodo.value,
				calidad: 'AOV',
			})
			.then(data => {
				return data.result
			})

	const datosEvolucionAOL = () =>
		service
			.getEvolucion({
				periodo: periodo.value,
				calidad: 'AOL',
			})
			.then(data => {
				return data.result
			})

	const key = ref(0)

	const datosEvolucion = () => {
		return Promise.all([datosEvolucionAOVE(), datosEvolucionAOV(), datosEvolucionAOL()]).then(values => {
			const length = values[0].length

			const result = []
			for (let i = 0; i < length; i++) {
				result.push({
					date: values[0][i].fecha,
					aove: values[0][i].precioMedio,
					aov: values[1][i].precioMedio,
					aol: values[2][i].precioMedio,
					cantidad: Round(values[0][i].cantidad + values[1][i].cantidad + values[2][i].cantidad, 2),
				})
			}

			return result
		})
	}

	watch(periodo, () => {
		chartLoader.value.reloadData()
	})

	// function refreshData() {
	// 	chartLoader.value.reloadData()
	// 	//key.value++
	// }

	// onMounted(async () => {
	// 	const p = await datosEvolucion()
	// 	console.log(p)
	// })

	function Round(value, decimal) {
		return Number(Math.round(value + 'e' + decimal) + 'e-' + decimal)
	}
</script>

<style scoped></style>
