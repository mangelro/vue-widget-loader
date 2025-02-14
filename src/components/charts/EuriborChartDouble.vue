<template>
	<!-- :theme="theme" -->
	<VChart class="chart" :option="option" autoresize />
</template>

<script setup>
	//name:'EuriborChartDouble',
	import { ref, provide, defineAsyncComponent, computed, watch, watchEffect } from 'vue'
	import { use } from 'echarts/core'
	import { CanvasRenderer } from 'echarts/renderers'
	import { LineChart } from 'echarts/charts'
	import { GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
	import VChart, { THEME_KEY } from 'vue-echarts'

	use([CanvasRenderer, GridComponent, LineChart, TitleComponent, TooltipComponent, LegendComponent])

	const props = defineProps({
		data: {
			type: Array,
			default: [],
		},
		title: {
			type: String,
		},
		seriesName: {
			type: Array,
			required: true,
		},
		theme: {
			type: String,
			default: 'light',
		},
	})

	watchEffect(() => {
		console.log(props.data)
	})

	provide(THEME_KEY, props.theme)

	const option = ref({
		title: {
			show: false,
			text: props.title,
		},
		tooltip: {
			trigger: 'axis',
			formatter: function (params) {
				const date = new Date(params[0].name).toLocaleDateString('es-ES', { month: 'short' }).toUpperCase()

				const salida = [`${date} <br/>`]
				for (let { color, seriesName, value } of params) {
					if (value !== undefined)
						salida.push(
							`<span style="font-size:1.5rem;color:${color}">&#9679;</span>&nbsp;&nbsp;${seriesName}&nbsp;&nbsp;&nbsp;${value}<br/>`
						)
				}

				return salida.join('')
			},
		},
		xAxis: {
			type: 'category',
			data: props.data.map(item => item.date),
			axisLabel: {
				formatter: value => new Date(value).toLocaleDateString('es-ES', { month: 'short' }).toUpperCase(),
				interval: 1,
			},
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				name: props.seriesName[0] ?? null,
				type: 'line',
				data: props.data.map(item => Object.values(item)[1] ?? null),
			},
			{
				name: props.seriesName[1] ?? null,
				type: 'line',
				data: props.data.map(item => Object.values(item)[2] ?? null),
			},
			{
				name: props.seriesName[2] ?? null,
				type: 'line',
				data: props.data.map(item => Object.values(item)[3] ?? null),
			},
		],
	})
</script>

<style scoped></style>
