<template>
	<VChart class="chart" :option="option" :theme autoresize />
</template>

<script setup>
	import { commonProperties } from './properties.js'
	import { commonToolbox } from './toolbox.js'
	import { computed } from 'vue'
	import { use } from 'echarts/core'
	import { CanvasRenderer } from 'echarts/renderers'
	import { LineChart } from 'echarts/charts'
	import {
		GridComponent,
		TitleComponent,
		TooltipComponent,
		LegendComponent,
		ToolboxComponent,
		DataZoomComponent
	} from 'echarts/components'
	import VChart from 'vue-echarts'


	use([
		CanvasRenderer,
		GridComponent,
		LineChart,
		TitleComponent,
		TooltipComponent,
		ToolboxComponent,
		LegendComponent,
		DataZoomComponent
	])

	const props = defineProps({
		...commonProperties,
		max: Number,
		min: Number,
	})

	const endColor = '#F7F2F7'
	const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']


	const option = computed(()=>({
		grid: {
			top: '10%',
			right: 80,
			bottom:80,
			left: 80,
		},
		title: {
			text: props.title,
		},
		legend: {
			show: true,
			top: 0,
			type: 'plain',
		},
		toolbox: commonToolbox,
		tooltip: {
			formatter: function (params) {
				const salida = [
					`<table cellSpacing="0" cellPadding="0" border="0" class="tooltip-echarts"><caption>${params[0].name}</caption>`,
				]
				for (let { seriesIndex, color, seriesName, value } of params) {
					if (value !== undefined)
						salida.push(
							`<tr><td ><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span></td><td>${seriesName}</td><td>${value}${
								seriesIndex === 3 ? ' t' : ' €/t'
							}</td></tr>`
						)
				}
				salida.push('</table>')
				return salida.join('')
			},
		},
		dataZoom: [
			{
				type: 'inside',
				start: 0,
				end: 50,
			},
			{
				start: 0,
				end: 50,
			},
		],
		xAxis: {
			type: 'category',
			data: props.data.map(item =>  `${monthNames[item.date.getMonth()]}'${item.date.getFullYear().toString().substring(2)}` ),
		},
		yAxis:
			{
				name: '€/t',
				type: 'value',
				scale: true,
				min:props.min,
				max:props.max,
				axisLabel: {
					show: true,
					color: '#aaa',
					formatter: v =>
						parseFloat(v).toLocaleString('es-ES', { style: 'decimal', minimumFractionDigits: 0 }),
				},
			},


		series: [
			{
				yAxisIndex: 0,
				lineStyle: {
					color: props.seriesColor[0],
				},
				name: props.seriesName[0] ?? props.title,
				type: 'line',
				data: props.data.map(item => item.aove),
				areaStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 0.2,
						colorStops: [
							{
								offset: 0,
								color: props.seriesColor[0],
							},
							{
								offset: 1,
								color: endColor,
							},
						],
						global: false, // default is false
					},
				},
				itemStyle: {
					color: props.seriesColor[0],
				},
			},
			{
				yAxisIndex: 0,
				lineStyle: {
					color: props.seriesColor[1],
				},
				name: props.seriesName[1] ?? props.title,
				type: 'line',
				data: props.data.map(item => item.aov),
				areaStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 0.2,
						colorStops: [
							{
								offset: 0,
								color: props.seriesColor[1],
							},
							{
								offset: 1,
								color: endColor,
							},
						],
						global: false, // default is false
					},
				},
				itemStyle: {
					color: props.seriesColor[1],
				},
			},
			{
				yAxisIndex: 0,
				lineStyle: {
					color: props.seriesColor[2],
				},
				name: props.seriesName[2] ?? props.title,
				type: 'line',
				data: props.data.map(item => item.aol),
				areaStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 0.2,
						colorStops: [
							{
								offset: 0,
								color: props.seriesColor[2],
							},
							{
								offset: 1,
								color: endColor,
							},
						],
						global: false, // default is false
					},
				},
				itemStyle: {
					color: props.seriesColor[2],
				},
			},
		],
	}))

</script>
