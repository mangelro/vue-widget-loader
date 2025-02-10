<template>
	<!-- :theme="theme" -->
	<VChart class="chart" :option="option"  autoresize />
</template>

<script setup>
	//name:'EuriborChart',
	import { ref, provide, defineAsyncComponent } from 'vue'
	import { use } from 'echarts/core'
	import { CanvasRenderer } from 'echarts/renderers'
	import { LineChart } from 'echarts/charts'
	import { GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
	import VChart, {THEME_KEY } from 'vue-echarts'

	use([CanvasRenderer, GridComponent, LineChart, TitleComponent, TooltipComponent, LegendComponent])


	const props = defineProps({
		data: {
			type: Array,
			default: [],
		},
		title: {
			type: String,
			default: '',
		},
		theme: {
			type: String,
			default: 'light',
		},	
	})

	provide(THEME_KEY, props.theme)	;

	const option = ref({
		
		title: {
			text: props.title,
		},
		tooltip: {
			trigger: 'axis',
			formatter: function (params) {
				const date = new Date(params[0].name).toLocaleDateString('es-ES', { year: '2-digit', month: 'short' })
				const value = params[0].value
				return `${date} : ${value}`
			},
		},
		xAxis: {
			type: 'category',
			data: props.data.map(item => item.date),
			axisLabel: {
				formatter: value => new Date(value).toLocaleDateString('es-ES', {month: 'short' }).toUpperCase(),
				interval: 1,
			},
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				type: 'line',
				data: props.data.map(item => item.value),
			},
		],
	})
</script>

<style scoped></style>
