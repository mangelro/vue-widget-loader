<template>
	<div class="grid">
		<article class="s12 m12 l6">
			<div class="row">
				<i>euro</i>
				<h5>iPOOL España</h5>
			</div>
			<ChartWidgetLoader
				component="IPoolChart.vue"
				:data-source="datosEspania"
				title="iPOOL España"
				theme="minimalist"
				aspect-ratio="10/9"
			></ChartWidgetLoader>
			<p class="small-text">{{ timestamp }}</p>
		</article>
		<article class="s12 m12 l6">
			<div class="row">
				<i>euro</i>
				<h5>iPOOL VL1</h5>
			</div>
			<ChartWidgetLoader
				component="IPoolChart.vue"
				:data-source="datosVL1"
				title="iPOOL VL1"
				theme="minimalist"
				aspect-ratio="10/9"
				series-color="#ee6666"
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

	const timestamp = ref('')
	const datosEspania = () =>
		service.getEspania().then(data => {
			timestamp.value = data.timestamp.toLocaleString('es-ES', { timeZone: "UTC", separator:'-' })
			
			
			return data.result.map(d => ({ date: parseDateString(d.fecha), value: d.indice }))
		})

		const datosVL1 = () =>
		service.getVL1().then(data => {
			//timestamp.value = data.timestamp
			return data.result.map(d => ({ date: parseDateString(d.fecha), value: d.indice }))
		})

	function parseDateString(date) {
	
		return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
	}

</script>

<style scoped></style>
