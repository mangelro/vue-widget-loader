<template>
	<div class="grid">
		<article class="s12 m12 l12">
			<DateRange v-model="periodo" @change-periodo="onChange"></DateRange>
			<select v-model="origen">
				<optgroup label="Paises">
					<option v-for="pais in paises" :value="pais.value">
						{{ pais.text }}
					</option>
				</optgroup>

				<optgroup label="Provincias">
					<option v-for="provincia in provincias" :value="provincia.value">
						{{ provincia.text }}
					</option>
				</optgroup>
			</select>
			<select v-model="selectCategoria">
				<option v-for="calidad in calidades" :value="calidad.value">
					{{ calidad.text }}
				</option>
			</select>
			
			<button class="btn primary small" @click="search">
				<i>search</i>
				<span>Buscar</span>
			</button>
		</article>
		<article class="s12 m12 l12">
			<ul class="list border">
				<h6>Total operaciones {{ data?.totalCount }}</h6>
				<li v-for="item in data?.items" :key="item.id">
					<i>{{ item.validada ? 'done_all' : 'check' }}</i>
					<div class="max">
						<p class="small">
							<a :href="`operaciones/${item.codOperacion}`">{{ item.codOperacion }}</a>
						</p>
						<div class="row">
							<p>{{ item.cantidad }}&nbsp;t</p>
							<button class="chip fill round" :class="item.calidad">{{ item.calidad }}</button>
							<p>{{ item.fechaVenta?.toLocaleDateString('es-ES') }}</p>
							<p>{{ item.fechaCobro?.toLocaleDateString('es-ES') }}</p>
							<p>{{ item.precio }}</p>
							<p>{{ item.precioAct }}</p>
						</div>
					</div>
					<label>
						<i class="green-text" title="ecologico" v-if="item.ecologico">eco</i>
						<i class="green-text" title="desagregada" v-if="item.desagregada">insert_page_break</i>
						<i class="grey-text" :title="item.compraVenta">{{
							item.compraVenta === 'V' ? 'upload' : 'download'
						}}</i>
					</label>
				</li>
			</ul>
			Incluye <i class="green-text" title="ecologico">eco</i> Ecológico
			<div class="row">
				<button @click="prevPage"><i>chevron_left</i></button>
				<button @click="nextPage"><i>chevron_right</i></button>
				{{ curentPage }}/{{ data?.totalPageCount }}
			</div>
			<p class="small-text">{{ data?.timestamp }}</p>
		</article>
	</div>
	<div id="errorToast" class="snackbar error">{{ error }}</div>
</template>

<script setup>
	//name:'Operaciones',
	import { ref, defineAsyncComponent } from 'vue'
	import { service } from '@services/OperacionesService'
	import { useResolver } from '@composables/Resolver.js'
	const DateRange = defineAsyncComponent(() => import('@components/DateRange.vue'))

	const props = defineProps({})

	const paises = ref([
		{ value: '#ES', text: 'España' },
		{ value: '#PT', text: 'Portugal' },
		{ value: '#IT', text: 'Italia' },
	])

	const provincias = ref([
		{ value: 'JAÉN', text: 'Jaén' },
		{ value: 'CÓRDOBA', text: 'Córdoba' },
		{ value: 'SEVILLA', text: 'Sevilla' },
		{ value: 'ALMERÍA', text: 'Almería' },
		{ value: 'CÁDIZ', text: 'Cádiz' },
		{ value: 'GRANADA', text: 'Granada' },
		{ value: 'HUELVA', text: 'Huelva' },
		{ value: 'MÁLAGA', text: 'Málaga' },
	])

	const selectCategoria = ref('TODAS')
	const calidades = ref([
		{ value: 'TODAS', text: 'Todas las categorias' },
		{ value: 'AOVE', text: 'A. O. Virgen Extra' },
		{ value: 'AOV', text: 'A. O. Virgen' },
		{ value: 'AOL', text: 'A. O. Lampante (B.1º)' },
		{ value: 'AOSP', text: 'Otro A. Calidad Inferior' },
	])

	const { tryResolve, data, error } = useResolver({
		notifications: {
			errorNotification: e => {
				ui('#errorToast', 2000)
			},
		},
	})

	const origen = ref('#ES')

	// watch(origen, newValue => {
	// 	console.log(origen.value.startsWith('#') ? origen.value.substring(1, 3) : null)
	// })

	const curentPage = ref(1)
	const periodo = ref('20250101|20250219')

	function search() {
		const query = {
			periodo: periodo.value,
			paged: `${curentPage.value}|10`,
			validada: true,
			calidad: selectCategoria.value,
			origenPais: origen.value.startsWith('#') ? origen.value.substring(1, 3) : null,
			origenProvincia: !origen.value.startsWith('#') ? origen.value : null,
			orderBy: 'fechaVenta',
			order: 'ASC',
		}

		tryResolve(() => service.getOperaciones(query,'f15e0e15-2cc1-453d-b998-2bcc80eda947'))
	}

	function nextPage() {
		if (curentPage.value < data.value?.totalPageCount) {
			curentPage.value++
			search()
		}
	}

	function prevPage() {
		if (curentPage.value > 1) {
			curentPage.value--
			search()
		}
	}
	
	function onChange(e) {
		search()
	}	
</script>

<style scoped></style>
