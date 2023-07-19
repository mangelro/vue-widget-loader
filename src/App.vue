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
		<widget-loader
			:url="'https://api.meteomatics.com/2023-05-25T00:00:00ZP1D:PT1H/t_2m:C,relative_humidity_2m:p/47.4245,9.3767/html?model=mix&request_type=GET'"
			:import-function="importEmployees"
			ref="employeesRef"
			fetch-on-mounted
		>
		</widget-loader>
	</dialog>

	<div class="grid">
		<div class="s12">
			<div class="small-space border round">
				<div class="progress left"></div>
			</div>
		</div>

		<div class="s12 m6">
			<widget-loader
				:url="'https://dummyjson.com/products/1'"
				:import-function="importProduct"
				fetch-on-mounted
			></widget-loader>
		</div>

		<div class="s12 m6">
			<widget-loader
				:url="'https://dummyjson.com/products/2'"
				:import-function="importProduct"
				fetch-on-mounted
			></widget-loader>
		</div>

		<div class="s12 m6">
			<widget-loader
				:url="'https://dummyjson.com/products/xx'"
				:import-function="importProduct"
				fetch-on-mounted
			></widget-loader>
		</div>
		<div class="s12 m6">
			<widget-loader
				:url="'https://dummyjson.com/products/4'"
				:import-function="importProduct"
				fetch-on-mounted
			></widget-loader>
		</div>
	</div>

	<div class="grid">
		<div class="s12">
			<!-- <the-list></the-list> -->
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
	</div>
</template>

<script setup>
	import { ref, reactive, defineAsyncComponent } from 'vue'

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

	const WidgetLoader = defineAsyncComponent(() => import('@components/loaders/WidgetLoader.vue'))

	// const TheList = defineAsyncComponent(() => import('@components/TheList.vue'))
	const TheListSlot = defineAsyncComponent(() => import('@components/TheListSlot.vue'))

	const employeesRef = ref()

	const importProduct = () => import('@components/WidgetProduct.vue')
	const importEmployees = () => import('@components/WidgetEmployees.vue')

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
</script>

<style scoped></style>
