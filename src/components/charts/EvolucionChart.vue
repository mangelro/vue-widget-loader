<template>
	<VChart class="chart" :option="option" :theme autoresize />
</template>

<script setup>
	import { commonProperties } from './properties.js'
	import { commonToolbox } from './toolbox.js'
	import { computed } from 'vue'
	import { use } from 'echarts/core'
	import { CanvasRenderer } from 'echarts/renderers'
	import { LineChart, BarChart } from 'echarts/charts'
	import {
		GridComponent,
		TitleComponent,
		TooltipComponent,
		LegendComponent,
		ToolboxComponent,
	} from 'echarts/components'
	import VChart from 'vue-echarts'

	use([
		CanvasRenderer,
		GridComponent,
		LineChart,
		BarChart,
		TitleComponent,
		TooltipComponent,
		ToolboxComponent,
		LegendComponent,
	])

	const props = defineProps({
		...commonProperties,
	})

	const endColor = '#F7F2F7'
	const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

	const option = computed(() => ({
		grid: {
			top: '10%',
			right: 80,
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
		xAxis: {
			type: 'category',
			data: props.data.map(item => item.date.toLocaleDateString()),
		},
		yAxis: [
			{
				name: '€/t',
				type: 'value',
				scale: true,
				axisLabel: {
					show: true,
					color: '#aaa',
					formatter: v =>
						parseFloat(v).toLocaleString('es-ES', { style: 'decimal', minimumFractionDigits: 0 }),
				},
			},
			{
				name: 'toneladas (t)',
				offset: 0,
				type: 'value',
				scale: true,
				axisLabel: {
					show: true,
					color: '#aaa',
					formatter: v =>
						parseFloat(v).toLocaleString('es-ES', { style: 'decimal', minimumFractionDigits: 0 }),
				},
				axisLine: {
					show: false,
				},
			},
		],

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
			{
				yAxisIndex: 1,
				type: 'bar',
				name: props.seriesName[3] ?? props.title,
				data: props.data.map(i => i.cantidad),

				itemStyle: {
					color: props.seriesColor[3],
				},

				showBackground: true,

				backgroundStyle: {
					color: props.seriesColor[3],
				},
			},
		],
	}))
</script>
