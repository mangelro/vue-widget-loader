<template>

	<VChart class="chart" :option="option" :theme autoresize />
</template>

<script setup>
	import {commomProperties} from './properties.js'
	import { ref, provide, defineAsyncComponent, computed } from 'vue'
	import { use } from 'echarts/core'
	import { CanvasRenderer } from 'echarts/renderers'
	import { LineChart } from 'echarts/charts'
	import {
		GridComponent,
		TitleComponent,
		TooltipComponent,
		LegendComponent,
		ToolboxComponent,
		DataZoomComponent,
	} from 'echarts/components'
	import VChart, { THEME_KEY } from 'vue-echarts'

	use([
		CanvasRenderer,
		GridComponent,
		LineChart,
		TitleComponent,
		TooltipComponent,
		ToolboxComponent,
		DataZoomComponent,
		LegendComponent,
	])

	const props = defineProps({
		...commomProperties
	})

	//provide(THEME_KEY, props.theme)

	const option = ref({
		grid: {
			//top: '5%',
			bottom: 100,
			right: 10,
			left: 10,
		},
		title: {
			text: props.title,
		},
		toolbox: {
			feature: {
				dataZoom: {
					yAxisIndex: 'none',
				},
				restore: {},
				saveAsImage: {},
			},
		},
		tooltip: {
			// position: function (pt) {
			// 	return [pt[0], '10%']
			// },
		},
		xAxis: {
			type: 'category',
			data: props.data.map(item => item.date),
			boundaryGap: false
		},
		yAxis: {
			type: 'value',
			boundaryGap: [0, 0],
			scale: true,
			splitNumber: 4,
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
				sampling: 'lttb',
				lineStyle: {
					color: props.seriesColor,
				},
				name: props.seriesName ?? props.title,
				type: 'line',
				data: props.data.map(item => item.value),
				areaStyle: {
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

<style scoped></style>
