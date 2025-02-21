<template>

	<VChart class="chart" :option="option" :theme autoresize />
</template>

<script setup>
	//name:'EuriborChart',
	import {commonProperties} from './properties'
	import { commonToolbox } from './toolbox.js'
	import { ref, provide, defineAsyncComponent, computed } from 'vue'
	import { use } from 'echarts/core'
	import { CanvasRenderer } from 'echarts/renderers'
	import { LineChart } from 'echarts/charts'
	import { GridComponent, TitleComponent, TooltipComponent, ToolboxComponent } from 'echarts/components'
	import VChart from 'vue-echarts'

	use([CanvasRenderer, GridComponent, LineChart, TitleComponent, TooltipComponent,ToolboxComponent])

	const props = defineProps({
		...commonProperties
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
				return `<p>${name}</p><span style="font-size:1.5rem;color:${color}">&#9679;</span>&nbsp;&nbsp;${seriesName}&nbsp;&nbsp;&nbsp;<b>${value}</b>`
			},
		},
		toolbox:commonToolbox,
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
			scale:true
		},
		series: [
			{
				lineStyle:{
					color: props.seriesColor,
				},
				
				name: props.seriesName ?? props.title,
				type: 'line',
				data: props.data.map(item => item.value),
				areaStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 0.5,
						colorStops: [
							{
								offset: 0,
								color: props.seriesColor
							},
							{
								offset: 1,
								color: '#FFF'
							},
						],
						global: false, // default is false
					},
				},
				
				itemStyle: {
					color: props.seriesColor,
				},
			},
		],
	})
</script>
