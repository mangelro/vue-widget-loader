<template>
	<div class="grid">
		<article class="s12 m12 l6">
			<div class="row">
				<i>chevron_right</i>
				<h5 class="max">iPOOL España</h5>
				<button class="chip round">
				<i class="primary-text">today</i>
				<span>{{ periodo }}</span>
			</button>
			</div>
			<ChartWidgetLoader
				component="IPoolChart.vue"
				:data-source="datosEspania"
				title="iPOOL España"
				theme="minimalist"
				aspect-ratio="10/9"
				series-color="#7CB5EC"
			></ChartWidgetLoader>
			<p class="small-text">{{ timestamp }}</p>
		</article>
		<article class="s12 m12 l6">
			<div class="row">
				<i>chevron_right</i>
				<h5 class="max">iPOOL VL1</h5>
				<button class="chip round">
				<i class="primary-text">today</i>
				<span>{{ periodo }}</span>
			</button>
			</div>
			<ChartWidgetLoader
				component="IPoolChart.vue"
				:data-source="datosVL1"
				title="iPOOL VL1"
				theme="minimalist"
				aspect-ratio="10/9"
				series-color="#ab4030"
			></ChartWidgetLoader>
			<p class="small-text">{{ timestamp }}</p>
		</article>
		<article class="s12 m12 l6">
			<div class="row">
				<i>chevron_right</i>
				<h5 class="max">iPOOL Extra</h5>
				<button class="chip round">
				<i class="primary-text">today</i>
				<span>{{ periodo }}</span>
			</button>
			</div>
			<ChartWidgetLoader
				component="IPoolChart.vue"
				:data-source="datosExtra"
				title="iPOOL Extra"
				theme="minimalist"
				aspect-ratio="21/20"
				series-color="#6cb304"
			></ChartWidgetLoader>
			<p class="small-text">{{ timestamp }}</p>
		</article>
		<article class="s12 m12 l6">
			<div class="row">
				<i>chevron_right</i>
				<h5 class="max">iPOOL Virgen</h5>
				<button class="chip round">
				<i class="primary-text">today</i>
				<span>{{ periodo }}</span>
			</button>
			</div>
			<ChartWidgetLoader
				component="IPoolChart.vue"
				:data-source="datosVirgen"
				title="iPOOL Virgen"
				theme="minimalist"
				aspect-ratio="10/9"
				series-color="#e7d21f"
			></ChartWidgetLoader>
			<p class="small-text">{{ timestamp }}</p>
		</article>
	</div>
</template>

<script setup>
	//name:'Precios',
	import { ref, defineAsyncComponent, onMounted } from 'vue'
	import { service } from '@services/IPoolService'

	const ChartWidgetLoader = defineAsyncComponent(() => import('@components/loaders/ChartWidgetLoader.vue'))

	const props = defineProps({})
	const periodo = '20240101|20241231'
	const timestamp = ref('')

	const datosEspania = () =>
		service
			.getEspania({
				periodo,
			})
			.then(data => {
				timestamp.value = data.timestamp.toLocaleString('es-ES', { timeZone: 'UTC', separator: '-' })

				return data.result.map(d => ({ date: d.fecha, value: d.indice }))
			})

	const datosVL1 = () =>
		service
			.getVL1({
				periodo,
			})
			.then(data => {
				//timestamp.value = data.timestamp
				return data.result.map(d => ({ date: d.fecha, value: d.indice }))
			})
	const datosExtra = () =>
		service
			.getExtra({
				periodo,
			})
			.then(data => {
				//timestamp.value = data.timestamp
				return data.result.map(d => ({ date: d.fecha, value: d.indice }))
			})
	const datosVirgen = () =>
		service
			.getVirgen({
				periodo,
			})
			.then(data => {
				//timestamp.value = data.timestamp
				return data.result.map(d => ({ date: d.fecha, value: d.indice }))
			})
</script>

<style scoped></style>
