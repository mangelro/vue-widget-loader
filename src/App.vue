<template>
	<header>
		<nav>
			<button class="circle transparent" @click="showDialog('#dialog-employees')">
				<i>menu</i>
			</button>
			<h5 class="max center-align">Servicios</h5>
			<button class="circle transparent">
				<img class="responsive" src="/vite.svg" />
			</button>
		</nav>
	</header>

	<dialog class="left" id="dialog-employees">
		<header class="fixed">
			<nav>
				<img class="circle" src="/vite.svg" />
				<div class="max"><h6>Empleados</h6></div>
				<button class="transparent circle" @click="refreshDialog()"><i>refresh</i></button>
				<button class="transparent circle" @click="closeDialog('#dialog-employees')"><i>close</i></button>
			</nav>
		</header>

		<!--https://dummy.restapiexample.com/api/v1/employees-->
		<!-- <widget-loader
			:url="'http://dummy.restapiexample.com/api/v1/employees'"
			:import-function="importEmployees"
			ref="employeesRef"
			fetch-on-mounted
		> 
		</widget-loader>  -->
	</dialog>

	<!-- <div class="grid small-space">
		<div class="s12">
			<div class="small-space border round">
				<div class="progress left"></div>
			</div>
		</div>

		<div class="s12 m6 l3">
			<widget-loader
				:url="'https://dummyjson.com/products/1'"
				:import-function="importProduct"
				fetch-on-mounted
			></widget-loader>
		</div>

		<div class="s12 m6 l3">
			<widget-loader
				:url="'https://dummyjson.com/products/2'"
				:import-function="importProduct"
				fetch-on-mounted
			></widget-loader>
		</div>

		<div class="s12 m6 l3">
			<widget-loader
				:url="'https://dummyjson.com/products/xx'"
				:import-function="importProduct"
				fetch-on-mounted
			></widget-loader>
		</div>
		<div class="s12 m6 l3">
			<widget-loader
				:url="'https://dummyjson.com/products/4'"
				:import-function="importProduct"
				fetch-on-mounted
			></widget-loader>
		</div>
	</div> -->

	<!-- <div class="grid">
		<div class="s12">
			<the-list-slot
				:items="items"
				@row-clicked="onRowClicked"
				@row-selected="onRowSelected"
				@rows-deleted="onRowsDeleted"
				v-slot="{ item }"
			>
				<i class="grey-text">schedule</i>
				<div class="max">
					<h6>{{ item.title }}</h6>
					<div>{{ item.description }}</div>
				</div>
			</the-list-slot>
		</div>
	</div> -->

	<div class="grid">
		<article class="s12 m12 l4 no-padding">
			<ChartWidgetLoader
				component="EuriborChart.vue"
				:data-source="datos2023"
				title="EURIBOR 23"
				theme="dashboard"
				class="small-opacity"
			></ChartWidgetLoader>

			<div class="absolute top left right small-padding top-margin">
				<div class="row orange-text">
					<i>euro</i>
					<h5 class="small">EURIBOR ANUAL</h5>
				</div>
				<div class="row">
					<h2 class="small" v-if="ultimoEurb !== null">{{ Number(ultimoEurb).toLocaleString('es-ES') }}</h2>
					<h6
						class="small"
						v-if="diferencialEurb !== null"
						:class="diferencialEurb > 0 ? 'green-text' : 'red-text'"
					>
						<i class="small">{{ diferencialEurb > 0 ? 'trending_up' : 'trending_down' }}</i
						>{{ diferencialEurb }}
					</h6>
					
				</div>
			</div>
		</article>
	</div>

	<div class="grid">
		<article class="s12 m12 l4 orange1">
			<div class="row orange-text">
				<i>euro</i>
				<h5>EURIBOR ANUAL</h5>
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
			></ChartWidgetLoader>
		</article>

		<article class="border s12 m12 l4">
			<ChartWidgetLoader
				component="EuriborChartDouble.vue"
				:data-source="datos2023Y2024"
				title="EURIBOR ANUAL"
				:series-name="['EURIBOR 23', 'EURIBOR 24']"
				theme="minimalist"
			></ChartWidgetLoader>
		</article>
	</div>
</template>

<script setup>
	import { ref, reactive, watchEffect, defineAsyncComponent } from 'vue'
	import { useFetcher } from '@composables/Fetcher.js'
	import { computed } from 'vue'

	const ChartWidgetLoader = defineAsyncComponent(() => import('@components/loaders/ChartWidgetLoader.vue'))

	const { fetcher } = useFetcher({
		url: 'https://localhost:7133/v1/euribor?periodo=202401|202412',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const { fetcher: fetcher2 } = useFetcher({
		url: 'https://localhost:7133/v1/euribor?periodo=202301|202312',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const datos2023 = () =>
		fetcher2().then(data =>
			data.result.map(d => ({ date: parseDateString(d.fecha), value: d.valor.toFixed(2) })).reverse()
		)

	const datos2024 = () =>
		fetcher().then(data =>
			data.result.map(d => ({ date: parseDateString(d.fecha), value: d.valor.toFixed(2) })).reverse()
		)

	const ultimoEurb = ref(null)
	const previoEurb = ref(null)

	const diferencialEurb = computed(() => (ultimoEurb.value - previoEurb.value).toFixed(2))

	const datos2023Y2024 = () => {
		return Promise.all([fetcher2(), fetcher()]).then(([data2023, data2024]) => {
			const datos23 = data2023.result
				.map(d => ({ date: parseDateString(d.fecha), value: d.valor.toFixed(2) }))
				.reverse()
			const datos24 = data2024.result
				.map(d => ({ date: parseDateString(d.fecha), value: d.valor.toFixed(2) }))
				.reverse()

			const max = Math.max(datos23.length, datos24.length)

			const newData = []

			let i = 0
			for (i = 0; i < max; i++) {
				newData.push({
					date: datos23[i].date,
					value1: datos23[i].value,
					value2: datos24[i].value,
				})
			}

			ultimoEurb.value = datos24[i - 1].value
			previoEurb.value = datos24[i - 2].value
			return newData
		})
	}

	const items = reactive([
		{
			id: 1,
			title: 'Hola',
			description: ',mundo1',
		},
		{
			id: 2,
			title: 'Hola',
			description: ',mundo2',
		},
		{
			id: 3,
			title: 'Hola',
			description: ',mundo3',
		},
		{
			id: 4,
			title: 'Hola',
			description: ',mundo4',
		},
		{
			id: 5,
			title: 'Hola',
			description: ',mundo5',
		},
	])

	//const WidgetLoader = defineAsyncComponent(() => import('@components/loaders/WidgetLoader.vue'))
	// const TheList = defineAsyncComponent(() => import('@components/TheList.vue'))
	//const TheListSlot = defineAsyncComponent(() => import('@components/TheListSlot.vue'))

	//const employeesRef = ref()

	//const importProduct = () => import('@components/WidgetProduct.vue')
	//const importEmployees = () => import('@components/WidgetEmployees.vue')

	function showDialog(selector) {
		ui(selector)
	}

	function closeDialog(selector) {
		ui(selector)
	}

	async function refreshDialog() {
		employeesRef.value.refreshData()
	}

	function onRowClicked(row) {
		console.log('onRowClicked --> ', row)
	}

	function onRowSelected(row, selected) {
		row.title += ' SELECT ' + selected
		console.log('onRowSelected --> ', row)
	}

	function onRowsDeleted(rows) {
		console.log('onRowDeleted --> ', rows)
	}

	function parseDateString(dateString) {
		const year = parseInt(dateString.substring(0, 4), 10)
		const month = parseInt(dateString.substring(4, 6), 10) - 1 // Los meses en JavaScript son 0-indexados
		return new Date(year, month)
	}
</script>
