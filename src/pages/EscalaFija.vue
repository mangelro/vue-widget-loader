<template>
	<div class="grid">
		<article class="s12 m12 l6">
			<DateRange v-model="periodo"></DateRange>
		</article>
		<article class="s12 m12 l12">
			<div class="row">
				<i>euro</i>
				<h6 class="max">Gráfico de escala fija</h6>

				<button class="chip round">
					<i class="primary-text">today</i>
					<span>{{ periodo }}</span>
				</button>
			</div>

			<ChartWidgetLoader
				component="EscalaFijaChart.vue"
				:data-source="datosEvolucion"
				title="Gráf. Escala fija"
				theme="minimalist"
				:series-color="['#6cb304', '#e7d21f', '#ab4030']"
				:series-name="['AOVE', 'AOV', 'AOL']"
				:max
				:min
				aspect-ratio="21/9"
				ref="chartLoader"
			></ChartWidgetLoader>

			<div class="row">
				[
				<div class="field border small">
					<input v-model.lazy="min" type="number" />
				</div>
				-
				<div class="field border small">
					<input v-model.lazy="max" type="number" />
				</div>
				]
			</div>

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




	const chartLoader = useTemplateRef('chartLoader')
	const max = ref(9200)
	const min = ref(1500)

	const timestamp = ref('')

	const periodo = ref('20250101|20250219')

	watch(periodo, () => {
		console.log(chartLoader.value)
		
		chartLoader.value.reloadData()
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
				})
			}

			return result
		})
	}

	// onMounted(async () => {
	// 	const p = await datosEvolucion()
	// 	console.log(p)
	// })

	// function Round(value, decimal) {
	// 	return Number(Math.round(value + 'e' + decimal) + 'e-' + decimal)
	// }
</script>

<style scoped></style>
