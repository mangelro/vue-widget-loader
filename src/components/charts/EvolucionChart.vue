<template>

	<VChart class="chart" :option="option" :theme autoresize />
</template>

<script setup>
	import {commomProperties} from './properties.js'
	import { ref, provide, defineAsyncComponent, computed } from 'vue'
	import { use } from 'echarts/core'
	import { CanvasRenderer } from 'echarts/renderers'
	import { LineChart,BarChart } from 'echarts/charts'
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
		BarChart,
		TitleComponent,
		TooltipComponent,
		ToolboxComponent,
		//DataZoomComponent,
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
		LegendComponent:{

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
			data: props.data.map(item => item.fecha.toLocaleDateString()),
			//boundaryGap: false,
		},
		yAxis: {
			type: 'value',
			boundaryGap: [0, 0],
			scale: true,
			splitNumber: 4,
		},
		// dataZoom: [
		// 	{
		// 		type: 'inside',
		// 		start: calculateStartIndex(props.data),
		// 		end: 100,
		// 	},
		// 	{
		// 		start: calculateStartIndex(props.data),
		// 		end: 100,
		// 	},
		// ],
		series: [
			{
				sampling: 'lttb',
				lineStyle: {
					color: props.seriesColor[0],
				},
				name: props.seriesName[0] ?? props.title,
				type: 'line',
				data: props.data.map(item => item.aove),
				areaStyle: {
					color: props.seriesColor[0],
				},
			},
			{
				sampling: 'lttb',
				lineStyle: {
					color: props.seriesColor[1],
				},
				name: props.seriesName[1] ?? props.title,
				type: 'line',
				data: props.data.map(item => item.aov),
				areaStyle: {
					color: props.seriesColor[1],
				},
			},
			{
				sampling: 'lttb',
				lineStyle: {
					color: props.seriesColor[2],
				},
				name: props.seriesName[2] ?? props.title,
				type: 'line',
				data: props.data.map(item => item.aol),
				areaStyle: {
					color: props.seriesColor[2],
				},
			},
			{
				type: 'bar',
				name: props.seriesName[3] ?? props.title,
				data: props.data.map(i => i.cantidad),
		
				itemStyle:{
					color: props.seriesColor[3],
				},
				
				showBackground: props.seriesColor[3] !== undefined,

				backgroundStyle: {
					color: props.seriesColor[3],
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
