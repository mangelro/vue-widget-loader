<template>
	<div class="grid">
		<article class="s12 m12 l6">
			<div class="row orange-text">
				<i>euro</i>
				<h5 class="max">EURIBOR ANUAL</h5>
				<button class="chip round">
					<i class="primary-text">today</i>
					<span>{{periodo}}</span>
				</button>
			</div>

			<h2 v-if="ultimoEurb !== null">{{ Number(ultimoEurb).toLocaleString('es-ES') }}</h2>
			<div class="row">
				<h6 v-if="diferencialEurb !== null" :class="diferencialEurb > 0 ? 'green-text' : 'red-text'">
					<i class="small right-margin">{{ diferencialEurb > 0 ? 'trending_up' : 'trending_down' }}</i
					>{{ diferencialEurb }}
				</h6>
				<p class="grey-text medium-text">Este mes</p>
			</div>
			<ChartWidgetLoader
				component="EuriborChart.vue"
				:data-source="datos2024"
				title="EURIBOR 24"
				theme="minimalist"
				aspect-ratio="21/9"
				series-color="#FF9C17"
			></ChartWidgetLoader>
		</article>
	</div>

	<!-- <div id="errorToast" class="snackbar error">{{ error }}</div> -->
</template>

<script setup>
	//name:'App',
	import { ref, defineAsyncComponent, computed, onMounted, onBeforeUnmount } from 'vue'
	import { service } from '@services/EuriborService'
	const ChartWidgetLoader = defineAsyncComponent(() => import('@components/loaders/ChartWidgetLoader.vue'))

	const periodo = '202401|202412'

	const ultimoEurb = ref(0)
	const previoEurb = ref(0)
	const diferencialEurb = computed(() => (ultimoEurb.value - previoEurb.value).toFixed(2))

	const datos2024 = () =>
		service.getIndices({ periodo }).then(data => {
			ultimoEurb.value = data.result[0].valor
			previoEurb.value = data.result[1].valor
			return data.result.map(d => ({ date: parseDateString(d.fecha), value: d.valor.toFixed(2) }))
		})

	function parseDateString(dateString) {
		const monthNames = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
		const year = dateString.substring(0, 4)
		const month = parseInt(dateString.substring(4, 6)) - 1 // Los meses en JavaScript son 0-indexados
		//return new Date(year, month)
		return `${monthNames[month]}-${year}`
	}
</script>

<style scoped></style>
