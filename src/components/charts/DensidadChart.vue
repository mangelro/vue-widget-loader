<template>
	<!-- :theme="theme" -->
	<VChart class="chart" :option="option" autoresize :theme />
</template>

<script setup>
	//name:'EuriborChart',
	import { commonProperties } from './properties'
	import { commonToolbox } from './toolbox.js'
	import { computed } from 'vue'
	import { use } from 'echarts/core'
	import { CanvasRenderer } from 'echarts/renderers'
	import { BarChart } from 'echarts/charts'
	import { GridComponent, TitleComponent, TooltipComponent, ToolboxComponent } from 'echarts/components'
	import VChart from 'vue-echarts'

	use([CanvasRenderer, GridComponent, BarChart, TitleComponent, TooltipComponent, ToolboxComponent])

	const props = defineProps({
		...commonProperties,
	})

	//provide(THEME_KEY, props.theme)

	//console.log('d',props.data.map(i => ({from:i.desde,to:i.hasta})),)

	/**
 * Blanco Humo: #F5F5F5
Marfil: #FFFFF0
Blanco Floral: #FFFAF0
Blanco Antiguo: #FAEBD7
Blanco Fantasma: #F8F8FF
Blanco Niebla: #F0F8FF
Blanco Lavanda: #E6E6FA
Blanco Menta: #F5FFFA
 * 
 */

	const option = computed(() => ({
		grid: {
			show: true,
			right: 10,
			left: 50,
		},
		title: {
			text: props.title,
		},
		tooltip: {
			formatter: function (params) {
				const { name, color, seriesName, value } = params[0]
				return `<p>De ${name.split(',')[0]} a ${
					name.split(',')[1]
				} €/Tm</p><span style="font-size:1.5rem;color:${
					props.seriesColor ?? color
				}">&#9679;</span>&nbsp;&nbsp;${seriesName}&nbsp;&nbsp;&nbsp;<b>${value}%</b>`
			},
		},
		toolbox: commonToolbox,
		xAxis: {
			type: 'category',
			data: props.data.map(i => [i.desde, i.hasta]),

			axisLabel: {
				show: true,
				fontSize: '0.7rem',
				formatter: (v, i) =>
					`de ${props.data[i].desde.toLocaleString('es-ES')}/tm.\na ${props.data[i].hasta.toLocaleString(
						'es-ES',
						{
							style: 'currency',
							currency: 'EUR',
						}
					)}/tm.`,
				width: 20,
				interval: 'auto',
				ellipsis: 'truncate',
			},
		},
		yAxis: {
			type: 'value',
			min: 0,
			max: 100,
			interval: 25,
			axisLabel: {
				show: true,
				color: '#aaa',
				formatter: v => v + '%',
			},
			splitLine: {
				show: false,
			},
		},
		series: [
			{
				type: 'bar',
				name: props.seriesName ?? props.title,
				data: props.data.map(i => i.porcentaje * 100),

				itemStyle: {
					color: props.seriesColor,
				},

				barWidth: '80%',

				showBackground: props.seriesColor !== undefined,

				backgroundStyle: {
					color: props.seriesColor,
				},
			},
		],
	}))

	//console.log(option.value)
</script>
