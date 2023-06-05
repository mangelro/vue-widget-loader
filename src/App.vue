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

		<!-- <div class="s12 m6">
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
		</div> -->
	</div>

	<div class="grid">
		<the-list></the-list>
	</div>
</template>

<script setup>
	import { ref, defineAsyncComponent } from 'vue'

	const WidgetLoader = defineAsyncComponent(() => import('@components/loaders/WidgetLoader.vue'))
	const TheList = defineAsyncComponent(() => import('@components/TheList.vue'))

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
</script>

<style></style>

