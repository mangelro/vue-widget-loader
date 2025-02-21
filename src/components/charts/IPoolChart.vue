<template>
	<VChart class="chart" :option="option" :theme autoresize />
</template>

<script setup>
	import { commonProperties } from './properties.js'
	import { commonToolbox } from './toolbox.js'
	import { ref, provide, defineAsyncComponent, computed } from 'vue'
	import { use } from 'echarts/core'
	import { CanvasRenderer } from 'echarts/renderers'
	import { LineChart } from 'echarts/charts'
	import {
		GridComponent,
		TitleComponent,
		TooltipComponent,
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
		DataZoomComponent
	])

	const props = defineProps({
		...commonProperties,
	})

	//provide(THEME_KEY, props.theme)

	const option = ref({
		grid: {
			top: '5%',
			bottom: 70,
			right: 10,
			left: '15%',
		},
		title: {
			text: props.title,
		},
		toolbox: commonToolbox,
		tooltip: {
			formatter: function (params) {
				const salida = [
					`<table cellSpacing="0" cellPadding="0" border="0" class="tooltip-echarts"><caption>${params[0].name}</caption>`,
				]
				for (let { color, marker, seriesName, value } of params) {
					if (value !== undefined)
						salida.push(
							`<tr><td><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span></td><td>${seriesName}</td><td>${value}&nbsp;€/t</td></tr>`
						)
				}
				salida.push('</table>')
				return salida.join('')
			},
		},
		xAxis: {
			type: 'category',
			data: props.data.map(item => item.date.toLocaleDateString('es-ES')),
			boundaryGap: false,
		},
		yAxis: {
			name: '€/t',
			type: 'value',
			boundaryGap: [0, 0],
			scale: true,
			splitNumber: 4,
			axisLabel: {
				show: true,
				formatter: v => parseFloat(v).toLocaleString('es-ES', { style: 'decimal', minimumFractionDigits: 0 }),
			},
		},
		dataZoom: [
			{
				type: 'inside',
				start: calculateStartIndex(props.data),
				end: 100,
			},
			{
				start: calculateStartIndex(props.data),
				end: 100,
			},
		],
		series: [
			{
				lineStyle: {
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
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: props.seriesColor,
							},
							{
								offset: 1,
								color: '#FFF',
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

	// Función para calcular el índice de inicio para los últimos 30 registros
	function calculateStartIndex(data) {
		const datosAMostrar = 30
		const totalRecords = data.length
		const startIndex = totalRecords > datosAMostrar ? totalRecords - datosAMostrar : 0
		return (startIndex / totalRecords) * 100
	}
</script>

