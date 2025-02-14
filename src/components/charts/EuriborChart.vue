<template>

	<VChart class="chart" :option="option" :theme autoresize />
</template>

<script setup>
	//name:'EuriborChart',
	import {commomProperties} from './properties'
	import { ref, provide, defineAsyncComponent, computed } from 'vue'
	import { use } from 'echarts/core'
	import { CanvasRenderer } from 'echarts/renderers'
	import { LineChart } from 'echarts/charts'
	import { GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
	import VChart, { THEME_KEY } from 'vue-echarts'

	use([CanvasRenderer, GridComponent, LineChart, TitleComponent, TooltipComponent, LegendComponent])

	const props = defineProps({
		...commomProperties
	})

	//provide(THEME_KEY, props.theme)

	const option = ref({
		title: {
			text: props.title,
		},
		tooltip: {
			trigger: 'axis',
			formatter: function (params) {
				const {name, color, seriesName, value } =params[0]
				return `<p>${name}</p><span style="font-size:1.5rem;color:${props.seriesColor??color}">&#9679;</span>&nbsp;&nbsp;${seriesName}&nbsp;&nbsp;&nbsp;<b>${value}</b>`
			},
		},
		xAxis: {
			type: 'category',
			data: props.data.map(item => item.date),
			// axisLabel: {
			// 	formatter: value => new Date(value).toLocaleDateString('es-ES', { month: 'short' }).toUpperCase(),
			// 	interval: 1,
			// },
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				lineStyle:{
					color: props.seriesColor,
				},
				
				name: props.seriesName ?? props.title,
				type: 'line',
				data: props.data.map(item => item.value),
				areaStyle:{
					color: props.seriesColor,
				}
			},
		],
	})
</script>

<style scoped></style>
